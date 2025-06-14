
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Full Stack Developer",
      company: "TechCorp",
      content: "DevGenius AI has revolutionized my coding workflow. The code generation tool saves me hours every day, and the bug detection caught issues I completely missed.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Frontend Engineer",
      company: "StartupXYZ",
      content: "The code refactoring suggestions are incredibly smart. It's like having a senior developer reviewing my code 24/7. Absolutely game-changing for our team's productivity.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Elena Vasquez",
      role: "Data Scientist",
      company: "DataFlow Inc",
      content: "As someone transitioning into web development, the code explainer feature has been invaluable. It breaks down complex concepts in ways that actually make sense.",
      avatar: "EV",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers who are already building better software with AI assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-effect border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-green-500/30">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-green-500/20 text-green-400 font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-green-400 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
