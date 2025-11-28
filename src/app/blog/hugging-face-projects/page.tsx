import { Metadata } from 'next';
import BlogPostLayout from '@/components/BlogPostLayout';

export const metadata: Metadata = {
  title: 'Our Open Source Contributions on Hugging Face',
  description: 'Exploring XenArcAI\'s latest projects and achievements in the AI research community through our Hugging Face contributions.',
  openGraph: {
    title: 'Our Open Source Contributions on Hugging Face',
    description: 'Exploring XenArcAI\'s latest projects and achievements in the AI research community through our Hugging Face contributions.',
    type: 'article',
    publishedTime: '2025-10-20',
    url: 'https://xenarcai.com/blog/hugging-face-projects',
  },
};

export default function BlogPost() {
  return (
    <BlogPostLayout 
      title="Our Open Source Contributions on Hugging Face"
      date="2025-10-20"
      readTime="5 min read"
      tags={['open-source', 'research', 'hugging-face', 'achievements']}
    >
      <p className="text-lg">At XenArcAI, we believe in the power of open collaboration to advance artificial intelligence research. Our team has been actively contributing to the global AI community through our work on Hugging Face, sharing models, datasets, and tools that help push the boundaries of what's possible in AI.</p>
      
      <h2>AIRealNet: Detecting AI-Generated Images</h2>
      <p>One of our flagship projects is <strong>AIRealNet</strong>, a binary image classifier designed to distinguish AI-generated images from real human photographs. In an era of rapidly advancing AI-generated imagery and deepfakes, the need for reliable detection tools has never been higher.</p>
      
      <p>Built on Microsoft's robust SwinV2 Tiny architecture, AIRealNet achieves a high degree of accuracy while remaining lightweight enough for practical deployment. Key features include:</p>
      
      <ul>
        <li>High accuracy on public datasets</li>
        <li>Balanced training with 60% AI-generated and 40% real images</li>
        <li>Ethical design that respects privacy by avoiding personal photos</li>
        <li>Fast and scalable deployment suitable for both research and production</li>
      </ul>
      
      <p>AIRealNet is particularly valuable for content moderators, researchers, and fact-checkers who need to identify synthetic media. The model is available on Hugging Face with clear documentation and usage examples.</p>
      
      <h2>MathX Dataset: Advancing Mathematical Reasoning</h2>
      <p>Our <strong>MathX dataset</strong> is a high-quality, synthetically curated, and meticulously filtered collection designed for advanced mathematical reasoning and AI model training. This dataset represents our commitment to creating specialized resources that help advance specific areas of AI research.</p>
      
      <p>The MathX dataset features:</p>
      
      <ul>
        <li>High-quality synthetically generated mathematical problems</li>
        <li>Meticulous filtering to ensure accuracy and relevance</li>
        <li>Designed specifically for advanced mathematical reasoning tasks</li>
        <li>Support for training complex AI models in mathematical domains</li>
      </ul>
      
      <h2>Our Commitment to Open Research</h2>
      <p>These projects exemplify our broader commitment to open research and transparent AI development. By sharing our work on platforms like Hugging Face, we aim to:</p>
      
      <ul>
        <li>Accelerate progress in the AI research community</li>
        <li>Enable reproducibility and peer review of our work</li>
        <li>Foster collaboration with other researchers and institutions</li>
        <li>Democratize access to cutting-edge AI tools and datasets</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>Looking ahead, we're excited to continue expanding our open-source contributions with projects that address emerging challenges in AI. Our roadmap includes:</p>
      
      <ul>
        <li>Improving detection capabilities for subtle AI-generated edits</li>
        <li>Expanding our dataset collection to cover more specialized domains</li>
        <li>Developing new models that push the boundaries of current AI capabilities</li>
        <li>Enhancing our existing tools based on community feedback</li>
      </ul>
      
      <p>We encourage researchers, developers, and AI enthusiasts to explore our projects on Hugging Face and contribute to the ongoing development of these tools. Together, we can build a more transparent and collaborative future for AI research.</p>
      
      <div className="bg-muted p-6 rounded-lg my-8">
        <h3 className="font-bold text-lg mb-2">Explore Our Projects</h3>
        <p>Visit our Hugging Face profile to access AIRealNet, the MathX dataset, and our other open-source contributions:</p>
        <a href="https://huggingface.co/XenArcAI" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
          XenArcAI on Hugging Face
        </a>
      </div>
    </BlogPostLayout>
  );
}