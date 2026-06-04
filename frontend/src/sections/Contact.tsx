"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const message = data.get("message") as string;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <SectionShell id="contact">
      <FadeIn>
        <SectionHeading
          label="Contact"
          title="Let's build something."
          description="Open to full-time frontend developer roles. Reach out — I'll respond quickly."
        />
      </FadeIn>

      <div className="grid gap-12 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <div className="space-y-6">
            <p className="text-lg text-muted leading-relaxed">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <Button
              href={`mailto:${siteConfig.email}`}
              variant="primary"
              size="lg"
              external
            >
              Send Email Directly
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={cn(inputClass, "resize-y min-h-[120px]")}
                  placeholder="Tell me about the role or project..."
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-6 w-full sm:w-auto"
            >
              <Send size={18} />
              {status === "sent" ? "Opening mail client…" : "Send Message"}
            </Button>
          </form>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";
