import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for XenArcAI',
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="text-muted-foreground mb-6"><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      
      <h2>Introduction</h2>
      <p>Welcome to XenArcAI. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
      
      <h2>Information We Collect</h2>
      <p>We may collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and services, participate in activities on the Services, or otherwise contact us.</p>
      
      <p>The personal information we collect may include:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Company name</li>
        <li>Job title</li>
        <li>Any other information you choose to provide</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>We use personal information collected via our Services for a variety of business purposes described below:</p>
      <ul>
        <li>To facilitate account creation and logon process</li>
        <li>To send administrative information to you</li>
        <li>To protect our Services</li>
        <li>To enforce our terms, conditions and policies</li>
        <li>To respond to legal requests and prevent harm</li>
        <li>For other business purposes such as data analysis, identifying usage trends, and evaluating and improving our Services</li>
      </ul>
      
      <h2>Information Sharing</h2>
      <p>We may process or share data based on the following legal basis:</p>
      <ul>
        <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
        <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
        <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
        <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
      </ul>
      
      <h2>Data Security</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
      
      <h2>Your Privacy Rights</h2>
      <p>You may review, change, or terminate your account at any time. Depending on your location, you may have the following rights regarding your personal information:</p>
      <ul>
        <li><strong>Right to Access:</strong> You have the right to request copies of your personal information.</li>
        <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
        <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal information.</li>
        <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information.</li>
        <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal information.</li>
      </ul>
      
      <h2>Contact Us</h2>
      <p>If you have questions or comments about this policy, you may email us at privacy@xenarcai.com.</p>
    </LegalLayout>
  );
}