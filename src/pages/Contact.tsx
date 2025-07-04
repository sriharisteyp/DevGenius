import React, { useState, useEffect } from "react"; // Correctly import useState and useEffect
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Star, ChevronDown, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useAuth } from "@/hooks/useAuth";

const API_URL = "https://devgenius-backend.onrender.com/api/ratings";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null); // Manage expanded FAQ state
  const [hasRated, setHasRated] = useState(false);
  const [average, setAverage] = useState<number | null>(null);
  const faqData = [
    {
      question: "How can I contact support?",
      answer: "You can use the form on this page or email us directly at support@example.com.",
    },
    {
      question: "What is your response time?",
      answer: "We typically respond within 24 hours.",
    },
    {
      question: "Can I update my contact information later?",
      answer: "Yes, please reach out to us with any updates to your information.",
    },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    emailjs.init("Tmg7xJLUVmJkkKtNv");
  }, []);

  useEffect(() => {
    // Fetch average rating
    const fetchAverage = async () => {
      try {
        const res = await fetch(`${API_URL}/average`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAverage(data.average);
      } catch {
        setAverage(null);
      }
    };
    fetchAverage();
  }, [hasRated]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject || "Contact Form Submission",
        message: formData.message,
      };

      await emailjs.send("service_qgrnojs", "template_ldqyx9s", templateParams, "Tmg7xJLUVmJkkKtNv");

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });

      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedback) {
      toast({
        title: "Error",
        description: "Please provide feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback!",
    });

    setFeedback("");
  };

  const handleRating = async (star: number) => {
    setRating(star);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating: star }),
      });
      setHasRated(true);
      toast({
        title: "Thank you!",
        description: "Your rating has been submitted.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit rating.",
        variant: "destructive",
      });
    }
  };

  return (
<div className="min-h-screen pt-16">
  <Navigation />
  <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Contact Form */}
    <div>
      <Card className="glass-effect border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <Mail className="mr-3 text-green-400" size={28} />
            Send us a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">First Name *</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                  disabled={isSubmitting}
                />  
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Last Name *</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Email *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="glass-effect border-gray-600 text-white placeholder-gray-400"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help you?"
                className="glass-effect border-gray-600 text-white placeholder-gray-400"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Message *</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project or question..."
                className="glass-effect border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                required
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 glow-effect"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    {/* Right Section */}
    <div>
      <Card className="glass-effect border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <Info className="mr-3 text-blue-400" size={28} />
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-semibold">About Us</h3>
            <p className="text-gray-300">
              We are dedicated to providing excellent service and support. Whether you need
              help with our services or have questions about your project, we are here for you.
            </p>
          </div>

          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-semibold">Rate Us</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"} ${hasRated ? "opacity-50 cursor-not-allowed" : ""}`}
                  size={32}
                  onClick={() => !hasRated && handleRating(star)}
                />
              ))}
            </div>
            {average !== null && (
              <div className="text-yellow-300 mt-2 font-semibold">
                Average Rating: {average.toFixed(1)} / 5
              </div>
            )}
            {hasRated && (
              <div className="text-green-400 mt-2 font-semibold">
                You have already rated. Thank you for your feedback!
              </div>
            )}
          </div>

          {/* Feedback Form */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-semibold">Share Your Feedback</h3>
            <Input
              name="email"
              type="email"
              placeholder="Your Email Address"
              className="glass-effect border-gray-600 text-white placeholder-gray-400 mb-4"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              className="glass-effect border-gray-600 text-white placeholder-gray-400 min-h-[100px] max-h-[150px]"
            />
            <Button
              onClick={handleFeedbackSubmit}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-2"
            >
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  {/* FAQ Section */}
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="glass-effect border-gray-500/30 p-6 rounded-lg">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-600 pb-4">
            <button
              className="w-full text-left text-white font-medium flex justify-between items-center"
              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`transition-transform ${
                  expandedFAQ === index ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </button>
            {expandedFAQ === index && (
              <p className="text-gray-300 mt-2 pl-2 border-l-4 border-green-500">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default Contact;
