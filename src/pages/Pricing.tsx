import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Rocket, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      credits: 15,
      description: "Start your journey with basic AI tools.",
      icon: <Briefcase className="h-12 w-12 text-green-400" />,
    },
    {
      id: "pro",
      name: "Pro",
      price: 999,
      credits: 100,
      description: "Advanced tools for growing developers.",
      icon: <Rocket className="h-12 w-12 text-blue-400" />,
    },
  ];

  const customCreditsOptions = [
    { value: 200, price: 799 },
    { value: 300, price: 1199 },
    { value: 400, price: 1599 },
    { value: 500, price: 1999 },
    { value: 600, price: 2499 },
    { value: 700, price: 2999 },
    { value: 800, price: 3499 },
    { value: 900, price: 3999 },
    { value: 1000, price: 4499 },
  ];

  const [selectedCustomCredits, setSelectedCustomCredits] = useState(customCreditsOptions[0]);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handlePaymentClick = (plan) => {
    if (!isAuthenticated || !user) {
      window.location.href = `/login?returnTo=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    toast({
      title: "Success",
      description: plan.id === "free" ? "Free plan activated!" : "Payment process initiated!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
      <Navigation />

      {/* Coming Soon Section */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10 backdrop-blur-sm">
  <div className="relative py-8 px-6 rounded-lg border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-xl text-center bg-opacity-70 ">
    <h2 className="text-5xl font-extrabold text-white">
      Coming Soon
    </h2>
    <p className="text-lg mt-4 text-gray-300">
      Exciting new features and plans are on their way. Stay tuned!
    </p>
  </div>
</div>




      {/* Pricing Section */}
      <div className="relative max-w-7xl mx-auto py-12 px-6 z-0">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Flexible AI-Powered Pricing
          </h1>
          <p className="text-lg text-gray-300">
            Empower your development journey with plans that fit every need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-gradient-to-br ${
                plan.id === "pro"
                  ? "from-green-500 to-blue-600 hover:scale-105"
                  : "from-gray-800 to-gray-900 hover:scale-105"
              } transform transition-all duration-300`}
            >
              <div className="flex flex-col items-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  {plan.id === "pro" && (
                    <Badge className="bg-yellow-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  )}
                </div>
                {plan.icon}
                <h2 className="text-3xl font-bold mt-4 text-white">{plan.name}</h2>
                <p className="text-gray-300 mt-2">{plan.description}</p>
                {plan.id === "free" && isAuthenticated && (
                  <div className="mt-4 text-yellow-300 text-center text-sm">
                    Need more credits? Check out our {" "}
                    <span className="font-semibold">Custom Credits</span> plan below!
                  </div>
                )}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-4xl font-bold">
                  {plan.price === 0 ? "Free" : `₹${plan.price}`}
                </h3>
                <p className="text-gray-400">{plan.credits} credits</p>
              </div>
              <Button
                className={`mt-8 bg-gradient-to-r ${
                  plan.id === "pro"
                    ? "from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
                    : "from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
                } w-full`}
                onClick={() => {
                  if (!isAuthenticated) {
                    toast({
                      title: "Sign Up Required",
                      description: "Sign up to add this plan.",
                    });
                    window.location.href = "/register?returnTo=" + encodeURIComponent(window.location.pathname);
                    return;
                  }
                  handlePaymentClick(plan);
                }}
              >
                {!isAuthenticated ? "Subscribe Now" : plan.price === 0 ? "Current Plan" : "Subscribe Now"}
              </Button>
            </div>
          ))}

          <div className="relative flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 hover:scale-105 transform transition-all duration-300">
            <div className="flex flex-col items-center">
              <DollarSign className="h-16 w-16 text-yellow-400 animate-pulse" />
              <h2 className="text-3xl font-bold mt-4 text-white">Custom Credits</h2>
              <p className="text-gray-200 mt-2">
                Tailor your credits to meet your exact requirements.
              </p>
            </div>
            <div className="mt-6">
              <Select
                value={selectedCustomCredits.value.toString()}
                onValueChange={(value) =>
                  setSelectedCustomCredits(
                    customCreditsOptions.find((option) => option.value === parseInt(value, 10))
                  )
                }
              >
                <SelectTrigger className="bg-gray-800 text-white w-full">
                  <SelectValue>
                    {selectedCustomCredits
                      ? `${selectedCustomCredits.value} credits`
                      : "Select Credits"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {customCreditsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.value} credits - ₹{option.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-gray-300 mt-4 text-center">
                ₹{selectedCustomCredits.price}
              </p>
            </div>
            <Button
              className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 w-full"
              onClick={() => {
                if (!isAuthenticated) {
                  toast({
                    title: "Sign Up Required",
                    description: "Sign up to add this plan.",
                  });
                  window.location.href = "/register?returnTo=" + encodeURIComponent(window.location.pathname);
                  return;
                }
                handlePaymentClick(selectedCustomCredits);
              }}
            >
              {!isAuthenticated ? "Purchase" : "Purchase"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
