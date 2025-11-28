"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

import HomeFooter from "@/components/HomeFooter";

export default function ContactPage() {
    return (
        <div className="bg-stone-100 min-h-screen flex flex-col">


            <main className="flex-grow pt-20 md:pt-24">
                <section className="py-8 md:py-12 max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="border-y">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8 px-4 md:px-7"
                        >
                            <h1 className="text-4xl font-extralight tracking-tight md:text-5xl lg:text-7xl">
                                Get in Touch
                            </h1>
                            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px] text-sm md:text-base">
                                Have a question or want to work together? We'd love to hear from you.
                            </p>
                        </motion.div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="container border-x-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-2">

                            {/* Left Column - Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="py-8 px-6 md:py-10 md:px-8 border-b-2 lg:border-b-0"
                            >
                                <h2 className="text-xl font-semibold tracking-tight mb-6">
                                    Contact Information
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">Email</h3>
                                            <a href="mailto:contact@xenarcai.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                contact@xenarcai.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">Phone</h3>
                                            <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                                +1 (555) 123-4567
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">Location</h3>
                                            <p className="text-sm text-muted-foreground">
                                                San Francisco, CA<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">Quick Links</h3>
                                    <div className="flex flex-col gap-2">
                                        <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            Support Center
                                        </Link>
                                        <Link href="/research" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            Research
                                        </Link>
                                        <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            Projects
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column - Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="py-8 px-6 md:py-10 md:px-8"
                            >
                                <h2 className="text-xl font-semibold tracking-tight mb-6">
                                    Send a Message
                                </h2>

                                <form className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="name" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="px-3 py-2 rounded-md border border-border bg-stone-100 text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="email" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="px-3 py-2 rounded-md border border-border bg-stone-100 text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="subject" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="px-3 py-2 rounded-md border border-border bg-stone-100 text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="message" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="px-3 py-2 rounded-md border border-border bg-stone-100 text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 mt-2"
                                    >
                                        <Send className="h-4 w-4" />
                                        Send Message
                                    </button>
                                </form>
                            </motion.div>

                        </div>
                    </div>
                    {/* Bottom Spacer */}
                    <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
                        <div className="container h-full w-full border-x"></div>
                    </div>
                </section>
            </main>

            <HomeFooter />
        </div>
    );
}
