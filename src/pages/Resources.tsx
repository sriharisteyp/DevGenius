
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Resources = () => {
  const blogPosts = [
    {
      title: "Top 10 AI Tools for Python Developers in 2024",
      excerpt: "Discover the most powerful AI tools that can supercharge your Python development workflow.",
      category: "Tools Review",
      readTime: "5 min read",
      date: "Dec 10, 2024"
    },
    {
      title: "How to Use GPT for Code Review",
      excerpt: "Learn how to leverage GPT models for automated code review and quality assurance.",
      category: "Tutorial",
      readTime: "8 min read",
      date: "Dec 8, 2024"
    },
    {
      title: "The Future of AI in Web Development",
      excerpt: "Exploring upcoming trends and technologies in AI-powered web development.",
      category: "Industry Insights",
      readTime: "6 min read",
      date: "Dec 5, 2024"
    }
  ];

  const forumTopics = [
    {
      title: "Best practices for AI-generated code integration",
      replies: 23,
      category: "Discussion",
      lastActivity: "2 hours ago"
    },
    {
      title: "How to optimize prompts for better code generation?",
      replies: 15,
      category: "Help",
      lastActivity: "4 hours ago"
    },
    {
      title: "Share your AI development workflow",
      replies: 31,
      category: "Showcase",
      lastActivity: "1 day ago"
    }
  ];

  const courses = [
    {
      title: "AI-Powered Development Fundamentals",
      provider: "DevGenius Academy",
      level: "Beginner",
      duration: "4 weeks",
      type: "Free"
    },
    {
      title: "Advanced Prompt Engineering for Developers",
      provider: "AI Institute",
      level: "Intermediate",
      duration: "6 weeks",
      type: "Paid"
    },
    {
      title: "Building AI Tools with Python",
      provider: "Code Academy",
      level: "Advanced",
      duration: "8 weeks",
      type: "Paid"
    }
  ];

  const glossaryTerms = [
    {
      term: "Large Language Model (LLM)",
      definition: "A type of AI model trained on vast amounts of text data to understand and generate human-like text."
    },
    {
      term: "Prompt Engineering",
      definition: "The practice of designing and optimizing input prompts to get better outputs from AI models."
    },
    {
      term: "Code Generation",
      definition: "The automated creation of source code using AI models based on natural language descriptions."
    },
    {
      term: "Retrieval Augmented Generation (RAG)",
      definition: "A technique that combines pre-trained language models with external knowledge retrieval."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Developer <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to master AI-powered development
          </p>
        </div>

        {/* Blog Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">AI for Dev Blog</h2>
            <Button variant="outline" className="glass-effect border-gray-600 hover:border-green-500 text-white">
              View All Posts
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="glass-effect border-gray-700 hover:border-green-500/50 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="text-xs text-gray-500">{post.readTime}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Forum */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Community Forum</h2>
            <Button variant="outline" className="glass-effect border-gray-600 hover:border-green-500 text-white">
              Join Discussion
            </Button>
          </div>
          <div className="space-y-4">
            {forumTopics.map((topic, index) => (
              <Card key={index} className="glass-effect border-gray-700 hover:border-green-500/30 transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className={`text-xs ${
                          topic.category === 'Discussion' ? 'bg-blue-500/20 text-blue-400' :
                          topic.category === 'Help' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {topic.category}
                        </Badge>
                      </div>
                      <h3 className="text-white font-medium mb-1">{topic.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{topic.replies} replies</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Hub */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Learning Hub</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="glass-effect border-gray-700 hover:border-green-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className={`${
                      course.type === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {course.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Provider: {course.provider}</div>
                    <div>Duration: {course.duration}</div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    {course.type === 'Free' ? 'Start Free' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Glossary */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">AI/ML Glossary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {glossaryTerms.map((item, index) => (
              <Card key={index} className="glass-effect border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{item.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
