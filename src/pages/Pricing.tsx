
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI development tools",
      features: [
        "5 AI requests per day",
        "Basic code generation",
        "Community support",
        "Access to public tools",
        "Basic documentation generation"
      ],
      limitations: [
        "Limited daily usage",
        "No priority support",
        "Basic features only"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For professional developers and small teams",
      features: [
        "500 AI requests per day",
        "All AI tools access",
        "Priority support",
        "Advanced code generation",
        "Custom templates",
        "Export functionality",
        "Integration support",
        "Code quality analysis"
      ],
      limitations: [],
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large teams and organizations",
      features: [
        "Unlimited AI requests",
        "Custom AI models",
        "Dedicated support",
        "On-premise deployment",
        "Advanced analytics",
        "Custom integrations",
        "Team management",
        "SLA guarantee",
        "White-label options"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const faqs = [
    {
      q: "Can I change my plan anytime?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      q: "What happens if I exceed my usage limits?",
      a: "For Free plans, you'll need to wait until the next day. Pro users can purchase additional requests."
    },
    {
      q: "Is there a free trial for Pro plans?",
      a: "Yes, we offer a 14-day free trial for all Pro features with no credit card required."
    },
    {
      q: "Do you offer student discounts?",
      a: "Yes, we offer 50% off Pro plans for verified students and educators."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and offer annual billing discounts."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel anytime. You'll retain access until the end of your billing period."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your development needs. Start free and scale as you grow.
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="glass-effect rounded-lg p-1 flex">
              <Button variant="ghost" className="text-white bg-green-500/20">
                Monthly
              </Button>
              <Button variant="ghost" className="text-gray-400">
                Annual (Save 20%)
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`glass-effect relative ${
                plan.popular 
                  ? 'border-green-500/50 scale-105' 
                  : 'border-gray-700'
              } hover:border-green-500/30 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
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
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700 glow-effect' 
                      : 'glass-effect border border-gray-600 hover:border-green-500 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <Card className="glass-effect border-gray-700">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-white">Feature</th>
                      <th className="text-center p-4 text-white">Free</th>
                      <th className="text-center p-4 text-white">Pro</th>
                      <th className="text-center p-4 text-white">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Daily AI Requests", "5", "500", "Unlimited"],
                      ["Code Generation", "✓", "✓", "✓"],
                      ["Bug Detection", "Basic", "Advanced", "Advanced"],
                      ["Documentation Gen", "✓", "✓", "✓"],
                      ["Priority Support", "✗", "✓", "✓"],
                      ["Custom Templates", "✗", "✓", "✓"],
                      ["Team Management", "✗", "✗", "✓"],
                      ["API Access", "✗", "✓", "✓"],
                      ["On-premise Deploy", "✗", "✗", "✓"]
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="p-4 text-gray-300">{row[0]}</td>
                        <td className="p-4 text-center text-gray-400">{row[1]}</td>
                        <td className="p-4 text-center text-gray-300">{row[2]}</td>
                        <td className="p-4 text-center text-green-400">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
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
