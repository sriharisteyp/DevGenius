
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesGrid = () => {
  const features = [
    {
      icon: "🚀",
      title: "Code Generator",
      description: "Generate boilerplate, functions, and code snippets based on natural language descriptions.",
      gradient: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30"
    },
    {
      icon: "🔍",
      title: "Bug Detector",
      description: "Identify potential bugs and security vulnerabilities before they become problems.",
      gradient: "from-red-500/20 to-red-600/20",
      border: "border-red-500/30"
    },
    {
      icon: "⚡",
      title: "Code Refactor",
      description: "Optimize existing code for better performance, readability, and maintainability.",
      gradient: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30"
    },
    {
      icon: "📝",
      title: "Documentation Gen",
      description: "Automatically generate comprehensive documentation and API references.",
      gradient: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30"
    },
    {
      icon: "🔄",
      title: "Language Translator",
      description: "Convert code between different programming languages seamlessly.",
      gradient: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30"
    },
    {
      icon: "🧠",
      title: "Code Explainer",
      description: "Get detailed explanations of complex code snippets and algorithms.",
      gradient: "from-cyan-500/20 to-cyan-600/20",
      border: "border-cyan-500/30"
    },
    {
      icon: "🎯",
      title: "Learning Path",
      description: "Personalized learning recommendations based on your skill level and goals.",
      gradient: "from-pink-500/20 to-pink-600/20",
      border: "border-pink-500/30"
    },
    {
      icon: "🔧",
      title: "Framework Recommender",
      description: "Get intelligent suggestions for the best tools and frameworks for your project.",
      gradient: "from-indigo-500/20 to-indigo-600/20",
      border: "border-indigo-500/30"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to supercharge your development workflow with artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`glass-effect ${feature.border} hover:border-opacity-80 transition-all duration-300 group hover:scale-105`}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
