import React from 'react';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 gradient-text">Terms of Service</h1>
      <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold pt-4">1. Agreement to Terms</h2>
        <p>By using our website, Kingdom Pages, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the website.</p>

        <h2 className="text-2xl font-semibold pt-4">2. Intellectual Property Rights</h2>
        <p>The Site and its original content, features, and functionality are owned by Kingdom Pages and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
        
        <h2 className="text-2xl font-semibold pt-4">3. User Representations</h2>
        <p>By using the Site, you represent and warrant that:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
        </ul>

        <h2 className="text-2xl font-semibold pt-4">4. Prohibited Activities</h2>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        
        <h2 className="text-2xl font-semibold pt-4">5. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.</p>
        
        <h2 className="text-2xl font-semibold pt-4">6. Contact Us</h2>
        <p>To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us through our contact page.</p>
        
        <p className="pt-6 text-sm text-muted-foreground italic">
          This is a template Terms of Service. You should consult with a legal professional to ensure it meets the specific needs and legal requirements of your organization.
        </p>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;