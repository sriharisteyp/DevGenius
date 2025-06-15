import { motion } from "framer-motion";
import { Check, Sparkles, Settings, Coins, Cloud, Lock, Zap } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    name: "Advanced AI Understanding",
    description: "Superior code comprehension with multi-language support and context-aware suggestions",
    icon: Sparkles,
    color: "text-purple-500",
    competitor: {
      github: "Basic",
      tabnine: "Limited"
    }
  },
  {
    name: "Customizable Workflows",
    description: "Tailor the AI to your coding style with adjustable settings and personalized suggestions",
    icon: Settings,
    color: "text-blue-500",
    competitor: {
      github: "Fixed",
      tabnine: "Partial"
    }
  },
  {
    name: "Cost-Effective Pricing",
    description: "Flexible pricing plans with unlimited usage, perfect for individuals and teams",
    icon: Coins,
    color: "text-green-500",
    competitor: {
      github: "Expensive",
      tabnine: "Limited"
    }
  },
  {
    name: "Cloud Integration",
    description: "Seamless integration with popular cloud services and development platforms",
    icon: Cloud,
    color: "text-sky-500",
    competitor: {
      github: "Limited",
      tabnine: "Basic"
    }
  },
  {
    name: "Enterprise Security",
    description: "Advanced security features with end-to-end encryption and compliance certifications",
    icon: Lock,
    color: "text-red-500",
    competitor: {
      github: "Standard",
      tabnine: "Basic"
    }
  },
  {
    name: "Real-time Performance",
    description: "Lightning-fast suggestions with minimal latency and offline support",
    icon: Zap,
    color: "text-yellow-500",
    competitor: {
      github: "Good",
      tabnine: "Variable"
    }
  }
];

const DifferentiationComparison = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-black/20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Why Choose <span className="gradient-text">DevGenius AI</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
          >
            Experience the next generation of AI-powered development with features that set us apart from the competition.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 glass-effect border-white/5 hover:border-emerald-500/30 transition-all duration-300 h-full group">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-opacity-10 ${feature.color.replace('text', 'bg')} transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {feature.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <span className="text-gray-400">GitHub Copilot:</span>
                        </div>
                        <span className="text-gray-500 block pl-4 font-mono">{feature.competitor.github}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                          <span className="text-gray-400">Tabnine:</span>
                        </div>
                        <span className="text-gray-500 block pl-4 font-mono">{feature.competitor.tabnine}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-400 text-lg hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer">
            <Check className="w-5 h-5" />
            <span>Experience the DevGenius AI difference today</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferentiationComparison;
