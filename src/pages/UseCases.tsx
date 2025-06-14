
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UseCases = () => {
  const useCases = [
    {
      title: "Faster Prototyping",
      description: "Speed up initial development with AI-generated boilerplate code",
      icon: "🚀",
      benefits: ["Rapid MVP development", "Quick proof of concepts", "Reduced time to market"]
    },
    {
      title: "Enhanced Code Quality",
      description: "Improve code quality with AI-powered refactoring and bug detection",
      icon: "✨",
      benefits: ["Cleaner codebase", "Fewer bugs in production", "Better maintainability"]
    },
    {
      title: "Accelerated Learning",
      description: "Learn faster with AI explanations and personalized learning paths",
      icon: "📚",
      benefits: ["Understand complex concepts", "Personalized curriculum", "Faster skill acquisition"]
    },
    {
      title: "Automated Documentation",
      description: "Generate comprehensive documentation automatically",
      icon: "📝",
      benefits: ["Always up-to-date docs", "Reduced manual work", "Better team collaboration"]
    }
  ];

  const industries = [
    {
      name: "Web Development",
      description: "Frontend and backend development tools",
      tools: ["React component generation", "API documentation", "CSS optimization"],
      color: "green"
    },
    {
      name: "Mobile Development",
      description: "iOS and Android development assistance",
      tools: ["Flutter code generation", "Native app debugging", "Cross-platform solutions"],
      color: "blue"
    },
    {
      name: "Data Science",
      description: "ML and data analysis tools",
      tools: ["Python script generation", "Data visualization", "Model optimization"],
      color: "purple"
    },
    {
      name: "DevOps",
      description: "Infrastructure and deployment automation",
      tools: ["Docker configurations", "CI/CD pipelines", "Monitoring setup"],
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI Solutions for <span className="gradient-text">Every Stage</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how AI can transform your development workflow across all phases of software development
          </p>
        </div>

        {/* Development Stage Use Cases */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Development Workflow Enhancement</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass-effect border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle className="text-white text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry-Specific Solutions */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Industry-Specific Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className={`glass-effect border-${industry.color}-500/30 hover:border-${industry.color}-500/50 transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="text-white text-xl">{industry.name}</CardTitle>
                  <p className="text-gray-400">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {industry.tools.map((tool, i) => (
                      <div key={i} className={`p-3 rounded-lg bg-${industry.color}-500/10 border border-${industry.color}-500/20`}>
                        <span className="text-gray-300 text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">50% Faster Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  "Using DevGenius AI's code generation tools, our team reduced development time by 50% while maintaining code quality."
                </p>
                <div className="text-sm text-green-400">- TechStartup Inc.</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">90% Bug Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  "The AI bug detector caught issues we completely missed, reducing production bugs by 90%."
                </p>
                <div className="text-sm text-green-400">- Enterprise Corp.</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Zero Documentation Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  "Automated documentation generation eliminated our documentation debt completely."
                </p>
                <div className="text-sm text-green-400">- DevTeam Solutions</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UseCases;
