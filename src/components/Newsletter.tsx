
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Newsletter = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-effect border-green-500/30 glow-effect">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Ahead with <span className="gradient-text">AI Innovation</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get the latest AI tools, tutorials, and insights delivered to your inbox. 
                Join our community of forward-thinking developers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="glass-effect border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 whitespace-nowrap glow-effect">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-gray-400">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>

            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Weekly AI insights
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Early access to tools
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Expert tutorials
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
