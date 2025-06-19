import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UPIPaymentDialog } from "@/components/UPIPaymentDialog";
import pricingService, { Plan } from "@/services/pricing.service";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await pricingService.getPlans();
        setPlans(fetchedPlans);
      } catch (err) {
        setError("Failed to load pricing plans. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load pricing plans",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  const handlePaymentClick = async (plan: Plan) => {
    if (!isAuthenticated || !user) {
      window.location.href = `/login?returnTo=${encodeURIComponent(
        window.location.pathname
      )}`;
      return;
    }

    try {
      // For free plan, create subscription directly
      if (plan.price === 0) {
        await pricingService.createSubscription(user.id, plan.id);
        toast({
          title: "Success",
          description: "Free plan activated successfully!",
        });
        return;
      }

      // For enterprise plan, redirect to contact
      if (plan.price === null) {
        window.location.href = "/contact";
        return;
      }

      // For paid plans, open payment dialog
      setSelectedPlan(plan);
      setIsPaymentDialogOpen(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request",
      });
    }
  };

  const getPlanCTA = (plan: Plan) => {
    if (plan.price === 0) return "Get Started Free";
    if (plan.price === null) return "Contact Sales";
    return "Subscribe Now";
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return `$${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <Navigation />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16">
        <Navigation />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Error Loading Plans
            </h2>
            <p className="text-gray-400">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple,{" "}
            <span className="gradient-text">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your development needs. Start free and
            scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`glass-effect relative ${
                plan.id === "pro"
                  ? "border-green-500/50 scale-105"
                  : "border-gray-700"
              } hover:border-green-500/30 transition-all duration-300`}
            >
              {plan.id === "pro" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-2xl mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    ₹{(plan.price)}
                  </span>
                  {plan.period !== "contact us" && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <Check className="text-green-400 mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 font-medium mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="text-sm text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  className={`w-full py-3 ${
                    plan.id === "pro"
                      ? "bg-green-600 hover:bg-green-700 glow-effect"
                      : "glass-effect border border-gray-600 hover:border-green-500 text-white"
                  }`}
                  onClick={() => handlePaymentClick(plan)}
                >
                  {getPlanCTA(plan)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <UPIPaymentDialog
            isOpen={isPaymentDialogOpen}
            onClose={() => {
              setIsPaymentDialogOpen(false);
              setSelectedPlan(null);
            }}
            amount={selectedPlan.price || 0}
            planName={selectedPlan.name}
          />
        )}

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What happens if I exceed my usage limits?",
                a: "For Free plans, you'll need to wait until the next day. Pro users can purchase additional requests.",
              },
              {
                q: "Is there a free trial for Pro plans?",
                a: "Yes, we offer a 14-day free trial for all Pro features with no credit card required.",
              },
              {
                q: "Do you offer student discounts?",
                a: "Yes, we offer 50% off Pro plans for verified students and educators.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI payments for all plans. For enterprise plans, we also support bank transfers.",
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel anytime. You'll retain access until the end of your billing period.",
              },
            ].map((faq, index) => (
              <Card key={index} className="glass-effect border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
