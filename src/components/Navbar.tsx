"use client";

import { Atom, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="fixed inset-x-0 top-0 z-20 bg-stone-100/80 backdrop-blur-md border-b border-stone-200/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex w-full items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-12 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="XenArcAI Home">
            <Atom className="size-5 sm:size-6 transition-transform hover:scale-105" aria-hidden="true" />
            <span className="text-sm sm:text-base md:text-lg font-semibold tracking-tighter transition-colors">
              XenArcAI
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <Button className="text-xs sm:text-sm transition-colors hover:bg-accent" variant="ghost" asChild>
              <a href="/research">Research</a>
            </Button>
            <Button className="text-xs sm:text-sm transition-colors hover:bg-accent" variant="ghost" asChild>
              <a href="/projects">Projects</a>
            </Button>
            <Button className="text-xs sm:text-sm transition-colors hover:bg-accent" variant="ghost" asChild>
              <a href="/blog">Blog</a>
            </Button>
          </div>

          <div className="hidden items-center gap-2 sm:gap-4 lg:flex">

            <Button className="rounded-full text-xs sm:text-sm transition-all hover:scale-105 hover:shadow-md px-3 py-2 sm:px-4 sm:py-2" asChild>
              <a href="/contact">Get In Touch</a>
            </Button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Main Menu"
              onClick={() => {
                if (open) {
                  setOpen(false);
                } else {
                  setOpen(true);
                }
              }}
              className="transition-all hover:scale-105 h-8 w-8 sm:h-10 sm:w-10"
            >
              {!open && <Menu className="size-4 sm:size-5 transition-transform" />}
              {open && <X className="size-4 sm:size-5 transition-transform" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Root) */}
        {open && (
          <div className="absolute inset-0 top-[60px] sm:top-[72px] flex h-[calc(100dvh-60px)] sm:h-[calc(100dvh-72px)] w-full flex-col overflow-scroll border-t border-border bg-stone-100 lg:hidden">
            <div className="flex flex-col gap-2 p-4 sm:p-6">
              <Button className="justify-start text-base" variant="ghost" asChild>
                <a href="/research">Research</a>
              </Button>
              <Button className="justify-start text-base" variant="ghost" asChild>
                <a href="/projects">Projects</a>
              </Button>
              <Button className="justify-start text-base" variant="ghost" asChild>
                <a href="/blog">Blog</a>
              </Button>
            </div>
            <div className="mx-4 sm:mx-6 mt-auto flex flex-col gap-4 py-8 sm:py-12">
              <span className="text-center text-sm sm:text-base">
                Interested in collaboration? <b>Contact us</b>
              </span>
              <Button className="relative transition-all hover:scale-105 h-10 sm:h-12" size="lg" asChild>
                <a href="/contact">Get In Touch</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { Navbar };