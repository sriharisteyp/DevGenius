
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const developer = {
    name: "Sri Hari S A",
    role: "CEO & Founder",
    bio: "Former researcher with 5+ years in Full stack Engineering and developer tools.",
    avatar: "SH",
    portfolio: "https://sri-hari.vercel.app" // Replace with the actual portfolio link
  };

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mission & Vision */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">DevGenius AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            We're on a mission to democratize AI-powered development tools and make every developer more productive, creative, and successful.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <Card className="glass-effect border-green-500/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed">
                  To empower developers worldwide with intelligent AI tools that enhance creativity, 
                  reduce repetitive tasks, and accelerate the development process. We believe that 
                  AI should augment human intelligence, not replace it, making every developer 
                  capable of building extraordinary software.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-blue-500/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-300 leading-relaxed">
                  A future where every developer has access to personalized AI assistance that 
                  understands their unique style, learns from their preferences, and helps them 
                  write better code faster. We envision a world where the barrier between idea 
                  and implementation is minimized through intelligent automation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

       

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Meet The Developer</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A diverse group of AI researchers, engineers, and developers passionate about building the future of development tools.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="glass-effect border-gray-700 text-center max-w-sm">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{developer.avatar}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{developer.name}</h3>
                <p className="text-green-400 text-sm mb-3">{developer.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{developer.bio}</p>
                <a
                  href={developer.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-600"
                >
                  View Portfolio
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

         {/* AI Philosophy */}
         <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our AI Philosophy</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We believe in responsible AI development that prioritizes human agency, transparency, and ethical considerations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">Human-Centric</h3>
                <p className="text-gray-400">
                  AI should enhance human capabilities, not replace human creativity and decision-making.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-3">Transparent</h3>
                <p className="text-gray-400">
                  Developers should understand how AI suggestions are generated and maintain full control.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-white mb-3">Ethical</h3>
                <p className="text-gray-400">
                  We prioritize data privacy, bias mitigation, and responsible AI practices in all our tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Innovation", desc: "Pushing boundaries in AI development" },
              { icon: "🎯", title: "Quality", desc: "Delivering excellence in every tool" },
              { icon: "🌍", title: "Accessibility", desc: "Making AI tools available to all developers" },
              { icon: "🔒", title: "Privacy", desc: "Protecting user data and maintaining trust" }
            ].map((value, index) => (
              <Card key={index} className="glass-effect border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
