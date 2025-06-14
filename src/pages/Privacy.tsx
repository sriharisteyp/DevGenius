
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: December 12, 2024</p>
        </div>

        <Card className="glass-effect border-gray-700">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  use our AI tools, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Usage data and AI tool interactions</li>
                  <li>Device and browser information</li>
                  <li>Communications with our support team</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our AI development tools</li>
                  <li>Personalize your experience and improve our services</li>
                  <li>Process your requests and provide customer support</li>
                  <li>Send you important updates and security notifications</li>
                  <li>Analyze usage patterns to enhance our AI models</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Secure data centers with 24/7 monitoring</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Limited access controls for our team members</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">API Keys and Third-Party Services</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Your API keys are stored locally in your browser and are never transmitted to our servers. 
                  When you use our AI tools:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>API requests are made directly from your browser to the AI service providers</li>
                  <li>We do not store or have access to your API keys</li>
                  <li>Your code and prompts are not permanently stored on our systems</li>
                  <li>All data transmission is encrypted using HTTPS</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We use cookies and similar technologies to improve your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies for authentication and security</li>
                  <li>Analytics cookies to understand how you use our service</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account data: Until you delete your account</li>
                  <li>Usage logs: 90 days for performance monitoring</li>
                  <li>Support communications: 2 years for quality assurance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <div className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Object to processing of your personal information</li>
                </ul>
                <p>
                  To exercise these rights, contact us at privacy@devgenius.ai
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  significant changes by posting the new policy on this page and updating the 
                  "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="space-y-2">
                  <li>Email: privacy@devgenius.ai</li>
                  <li>Address: DevGenius AI, 123 Tech Street, San Francisco, CA 94105</li>
                </ul>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
