import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Lock, Coins, Boxes, Fingerprint } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "Advanced AI Understanding",
    description: "Superior code comprehension with context-aware suggestions that understand your entire codebase, not just line-by-line assistance.",
    color: "from-violet-600 to-indigo-600"
  },
  {
    icon: Zap,
    title: "Real-Time Learning",
    description: "Adapts to your coding style and preferences in real-time, offering increasingly personalized suggestions as you code.",
    color: "from-amber-600 to-orange-600"
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "Built-in code security scanning and vulnerability detection, ensuring your code is not just functional but secure.",
    color: "from-emerald-600 to-green-600"
  },
  {
    icon: Coins,
    title: "Cost-Effective Pricing",
    description: "Transparent pricing with no hidden fees. Pay for what you use with flexible plans that scale with your needs.",
    color: "from-blue-600 to-cyan-600"
  },
  {
    icon: Boxes,
    title: "Framework Expertise",
    description: "Specialized support for modern frameworks and libraries, providing framework-specific optimizations and best practices.",
    color: "from-pink-600 to-rose-600"
  },
  {
    icon: Fingerprint,
    title: "Privacy-First Approach",
    description: "Your code stays private with local processing capabilities and strict data handling policies.",
    color: "from-purple-600 to-fuchsia-600"
  }
];

const comparisonFeatures = [
  {
    feature: "Code Understanding",
    devgenius: "Full project context awareness",
    others: "Limited to file-level context"
  },
  {
    feature: "Learning Capability",
    devgenius: "Real-time adaptation to coding style",
    others: "Static suggestion patterns"
  },
  {
    feature: "Security Features",
    devgenius: "Built-in vulnerability scanning",
    others: "Basic security checks"
  },
  {
    feature: "Framework Support",
    devgenius: "Deep framework-specific optimizations",
    others: "Generic code suggestions"
  },
  {
    feature: "Privacy",
    devgenius: "Local processing available",
    others: "Cloud-dependent processing"
  }
];

const DifferentiationSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black/50" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose DevGenius AI?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Experience the next generation of AI-powered development with features that set us apart from the competition.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-black/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-px bg-white/5">
            <div className="bg-black/50 p-4 font-semibold text-gray-300">Feature</div>
            <div className="bg-black/50 p-4 font-semibold text-emerald-400">DevGenius AI</div>
            <div className="bg-black/50 p-4 font-semibold text-gray-400">Others</div>
            
            {comparisonFeatures.map((item, index) => (
              <React.Fragment key={item.feature}>
                <div className="bg-black/30 p-4 text-gray-300">{item.feature}</div>
                <div className="bg-black/30 p-4 text-emerald-400">{item.devgenius}</div>
                <div className="bg-black/30 p-4 text-gray-400">{item.others}</div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
