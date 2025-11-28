import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Licensing',
  description: 'Licensing information for XenArcAI',
};

export default function Licensing() {
  return (
    <LegalLayout title="Licensing">
      <p className="text-muted-foreground mb-6"><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      
      <h2>Software Licenses</h2>
      <p>XenArcAI provides various software tools and libraries under different licensing terms. All software is provided "as is" without warranty of any kind.</p>
      
      <h2>Open Source Licenses</h2>
      <p>Some components of our software may be distributed under open source licenses. We comply with all applicable open source licenses and provide attribution where required.</p>
      
      <h2>Proprietary Software</h2>
      <p>Unless otherwise specified, all XenArcAI software is proprietary and copyrighted. Use of our proprietary software is governed by the terms of the applicable license agreement.</p>
      
      <h2>API Usage</h2>
      <p>Access to our APIs is granted under the terms of our API License Agreement. Unauthorized use of our APIs may result in termination of access and legal action.</p>
      
      <h2>Research Licenses</h2>
      <p>Research models and datasets may be available under special licensing terms for academic and non-commercial use. Contact our research team for more information.</p>
      
      <h2>Commercial Use</h2>
      <p>Commercial use of our software and services requires a commercial license agreement. Please contact our sales team for licensing options.</p>
      
      <h2>Attribution</h2>
      <p>When using our software in publications or presentations, we request appropriate attribution to XenArcAI and the specific project.</p>
      
      <h2>Third-Party Licenses</h2>
      <p>Our software may include third-party components that are distributed under their own licenses. These licenses are included with the software distribution.</p>
      
      <h2>License Changes</h2>
      <p>We reserve the right to change licensing terms at any time. Continued use of our software after such changes constitutes acceptance of the new terms.</p>
      
      <h2>Contact Us</h2>
      <p>For licensing inquiries, please contact us at licensing@xenarcai.com.</p>
    </LegalLayout>
  );
}