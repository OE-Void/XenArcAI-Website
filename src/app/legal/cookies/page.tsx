import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for XenArcAI',
};

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy">
      <p className="text-muted-foreground mb-6"><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      
      <h2>How We Use Cookies</h2>
      <p>We use cookies to enhance your experience on our website and to better understand how visitors interact with our content. Cookies help us with:</p>
      <ul>
        <li>Remembering information you've entered on forms</li>
        <li>Understanding how you use our website</li>
        <li>Improving website performance</li>
        <li>Providing personalized content</li>
      </ul>
      
      <h2>Types of Cookies We Use</h2>
      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</p>
      
      <h3>Performance Cookies</h3>
      <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</p>
      
      <h3>Functionality Cookies</h3>
      <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</p>
      
      <h3>Targeting Cookies</h3>
      <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</p>
      
      <h2>Third-Party Cookies</h2>
      <p>In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through our site:</p>
      <ul>
        <li>Google Analytics cookies for tracking website usage and performance</li>
        <li>Social media cookies for sharing content on social networks</li>
        <li>Advertising cookies for delivering relevant advertisements</li>
      </ul>
      
      <h2>Managing Cookies</h2>
      <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
      
      <h2>Changes to This Cookie Policy</h2>
      <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about our Cookie Policy, please contact us at privacy@xenarcai.com.</p>
    </LegalLayout>
  );
}