import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for XenArcAI',
};

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <p className="text-muted-foreground mb-6"><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      
      <h2>Introduction</h2>
      <p>Welcome to XenArcAI. These Terms of Service govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations.</p>
      
      <h2>Use of Services</h2>
      <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
      <ul>
        <li>Use the services in any way that violates any applicable federal, state, local, or international law or regulation</li>
        <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the services</li>
        <li>Use the services in any manner that could disable, overburden, damage, or impair the site</li>
        <li>Attempt to gain unauthorized access to the services, accounts, computer systems, or networks</li>
      </ul>
      
      <h2>Intellectual Property</h2>
      <p>The services and their entire contents, features, and functionality are owned by XenArcAI, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
      
      <h2>User Content</h2>
      <p>You retain ownership of any intellectual property rights that you hold in content you submit to our services. When you upload, submit, store, send, or receive content to or through our services, you grant XenArcAI a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.</p>
      
      <h2>Disclaimer of Warranties</h2>
      <p>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. XENARCAI DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      
      <h2>Limitation of Liability</h2>
      <p>IN NO EVENT SHALL XENARCAI, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES.</p>
      
      <h2>Indemnification</h2>
      <p>You agree to defend, indemnify, and hold harmless XenArcAI, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the services.</p>
      
      <h2>Governing Law</h2>
      <p>All matters relating to the services and these Terms shall be governed by and construed in accordance with the internal laws of the State of California without giving effect to any choice or conflict of law provision or rule.</p>
      
      <h2>Changes to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on our website.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at legal@xenarcai.com.</p>
    </LegalLayout>
  );
}