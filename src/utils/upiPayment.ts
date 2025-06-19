interface UPIParams {
    amount: number;
    transactionId: string;
    customerName?: string;
    purpose?: string;
}

class UPIPayment {
    private readonly upiId = 'anusajesh5@oksbi';
    private readonly receiverName = 'Anu Sajesh';

    generateTransactionId(): string {
        // Simpler transaction ID format for personal UPI
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `P${timestamp}${random}`;
    }

    generateUPILink({ amount, transactionId, purpose }: UPIParams): string {
        try {
            const upiURL = new URL('upi://pay');
            const params: Record<string, string> = {
                pa: this.upiId, // UPI ID
                pn: this.receiverName, // Your name as registered in GPay
                tn: 'DevGenius AI Plan', // Simple transaction note
                am: amount.toString(), // Amount without decimal for small amounts
                cu: 'INR' // Currency
            };

            Object.entries(params).forEach(([key, value]) => {
                upiURL.searchParams.append(key, value);
            });

            return upiURL.toString();
        } catch (error) {
            console.error('Error generating UPI link:', error);
            throw new Error('Failed to generate UPI payment link');
        }
    }
}

export default new UPIPayment();
