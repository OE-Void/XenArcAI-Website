"use client";

import { Asterisk, Mail, Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  {
    group: "Research",
    items: [
      {
        title: "Research Areas",
        href: "/research",
      },
      {
        title: "Projects",
        href: "/#projects",
      },
      {
        title: "Open Source",
        href: "/#open-source",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    group: "Company",
    items: [
      {
        title: "About",
        href: "/#about",
      },
      {
        title: "Careers",
        href: "/#careers",
      },
      {
        title: "Contact",
        href: "/#contact",
      },
    ],
  },
  {
    group: "Legal",
    items: [
      {
        title: "Privacy Policy",
        href: "/legal/privacy",
      },
      {
        title: "Terms of Service",
        href: "/legal/terms",
      },
      {
        title: "Cookie Policy",
        href: "/legal/cookies",
      },
      {
        title: "Licensing",
        href: "/legal/licensing",
      },
    ],
  },
  {
    group: "Resources",
    items: [
      {
        title: "Documentation",
        href: "/resources",
      },
      {
        title: "Tutorials",
        href: "/resources",
      },
      {
        title: "API Reference",
        href: "/resources",
      },
      {
        title: "Support",
        href: "/resources",
      },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground">
                <Asterisk className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-foreground">XenArcAI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Advancing AI research through innovation, ethics, and collaboration for a better future.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send us an email"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {links.map((link, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{link.group}</h3>
              <ul className="mt-4 space-y-3">
                {link.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} XenArcAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}