
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-gray-400">Last updated: December 12, 2024</p>
        </div>

        <Card className="glass-effect border-gray-700">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  By accessing and using DevGenius AI's services, you accept and agree to be bound by the 
                  terms and provision of this agreement. These Terms of Service govern your use of our 
                  AI-powered development tools and services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Description of Service</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  DevGenius AI provides AI-powered development tools including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Code generation and refactoring tools</li>
                  <li>Bug detection and analysis</li>
                  <li>Documentation generation</li>
                  <li>Learning path recommendations</li>
                  <li>Code explanation and translation services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  To access certain features of our service, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Promptly updating your account information when necessary</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
              <div className="text-gray-300 space-y-4">
                <p>You agree not to use our services to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Generate malicious or harmful code</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to reverse engineer our AI models</li>
                  <li>Share or distribute inappropriate content</li>
                  <li>Overload or interfere with our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  You retain ownership of any code you create using our tools. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>DevGenius AI retains ownership of the platform and AI models</li>
                  <li>Generated code suggestions are provided as-is without warranty</li>
                  <li>You are responsible for ensuring generated code doesn't infringe on third-party rights</li>
                  <li>We may use anonymized usage data to improve our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">API Usage and Third-Party Services</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Our service integrates with third-party AI providers. By using our tools:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must comply with third-party API terms of service</li>
                  <li>You are responsible for your own API key usage and costs</li>
                  <li>We are not liable for third-party service availability or performance</li>
                  <li>You must ensure your API keys are kept secure</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment and Billing</h2>
              <div className="text-gray-300 space-y-4">
                <p>For paid services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscription fees are billed in advance</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>We may change pricing with 30 days notice</li>
                  <li>Failure to pay may result in service suspension</li>
                  <li>You authorize us to charge your payment method</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  While we strive for high availability, we do not guarantee uninterrupted service. 
                  We may temporarily suspend or restrict access for maintenance, updates, or 
                  security reasons.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Our services are provided "as is" without any warranties, express or implied. 
                  We disclaim all warranties including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accuracy or reliability of AI-generated code</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement of third-party rights</li>
                  <li>Uninterrupted or error-free operation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  DevGenius AI shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising from your use of our services, 
                  including but not limited to damages for loss of profits, data, or business 
                  interruption.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Either party may terminate this agreement at any time. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your access to paid features will cease</li>
                  <li>We may delete your account data after 30 days</li>
                  <li>You remain liable for any outstanding fees</li>
                  <li>Certain provisions of these terms will survive termination</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may modify these terms at any time. Continued use of our services after 
                  changes are posted constitutes acceptance of the new terms. We will notify 
                  users of significant changes via email or platform notifications.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  If you have questions about these Terms of Service, contact us:
                </p>
                <ul className="space-y-2">
                  <li>Email: legal@devgenius.ai</li>
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

export default Terms;
