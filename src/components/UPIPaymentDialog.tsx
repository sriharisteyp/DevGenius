import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import pricingService from '@/services/pricing.service';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeCanvas } from 'qrcode.react';
import { Loader2 } from 'lucide-react';
import upiPayment from '@/utils/upiPayment';

interface UPIPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  planName: string;
}

export function UPIPaymentDialog({ isOpen, onClose, amount, planName }: UPIPaymentDialogProps) {
  const [upiLink, setUpiLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const generatePaymentLink = useCallback(() => {
    try {
      setIsLoading(true);
      setError('');
      
      const newTransactionId = upiPayment.generateTransactionId();
      setTransactionId(newTransactionId);
      
      const link = upiPayment.generateUPILink({
        amount,
        transactionId: newTransactionId,
        purpose: `DevGenius AI - ${planName} Plan`
      });

      console.log('Generated UPI link:', link); // Debug log
      setUpiLink(link);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to generate UPI link:', err);
      setError('Failed to generate payment details. Please try again.');
      setIsLoading(false);
    }
  }, [amount, planName]);
  const verifyPayment = useCallback(async () => {
    if (!transactionId) return false;
    
    try {
      setVerifying(true);
      console.log('Verifying payment for transaction:', transactionId);
      const result = await pricingService.verifyPayment(transactionId, 'pro');
      
      if (result.success) {
        console.log('Payment verification successful:', result);
        toast({
          title: "Payment Successful!",
          description: "Your Pro plan has been activated.",
          variant: "success"
        });
        onClose();
        navigate('/ai-tools');
        return true;
      }
    } catch (err) {
      if (checkCount >= 5) {
        setError('Payment verification failed. Please contact support if amount was deducted.');
        setVerifying(false);
        return false;
      }
    }
    return false;
  }, [transactionId, checkCount, toast, onClose, navigate]);

  // Automatically check payment status every 5 seconds
  useEffect(() => {
    if (upiLink && !verifying && checkCount < 5) {
      const timer = setInterval(async () => {
        setCheckCount(prev => prev + 1);
        const success = await verifyPayment();
        if (success) {
          clearInterval(timer);
        }
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [upiLink, verifying, checkCount, verifyPayment]);
  useEffect(() => {
    if (isOpen) {
      generatePaymentLink();
    }
  }, [isOpen, generatePaymentLink]);

  const handleUPIAppClick = () => {
    if (upiLink) {
      window.location.href = upiLink;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Pay with UPI</DialogTitle>
          <DialogDescription className="text-gray-400">
            Amount to pay: ₹{amount}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>            <Button onClick={generatePaymentLink} variant="outline">
              Retry
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="qr" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
              <TabsTrigger value="app">Pay via UPI App</TabsTrigger>
            </TabsList>

            <TabsContent value="qr" className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCodeCanvas value={upiLink} size={200} />
              </div>
              <p className="text-sm text-gray-400 text-center">
                Scan this QR code with any UPI app to pay
              </p>
            </TabsContent>

            <TabsContent value="app" className="flex flex-col items-center">
              <Button 
                onClick={handleUPIAppClick}
                className="w-full bg-green-600 hover:bg-green-700 mb-4"
              >
                Open UPI App
              </Button>
              <p className="text-sm text-gray-400 text-center">
                Click to open your default UPI app for payment
              </p>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
