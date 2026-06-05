"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/constants/site";
import { sendContactMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "sent" | "gmail" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      message: data.get("message") as string,
    };

    const result = await sendContactMessage(payload);

    if (result.ok && result.method === "web3forms") {
      setStatus("sent");
      setFeedback("Message sent — I'll get back to you on Gmail soon.");
      form.reset();
      return;
    }

    if (result.ok && result.method === "gmail") {
      setStatus("gmail");
      setFeedback("Gmail opened with your message pre-filled. Hit send there.");
      return;
    }

    setStatus("error");
    setFeedback(result.error);
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
              Messages go straight to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              . Fill out the form or open Gmail directly.
            </p>
            <Button
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent("Portfolio inquiry")}`}
              variant="secondary"
              size="lg"
              external
            >
              Open in Gmail
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl md:p-8"
          >
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
                  className={cn(inputClass, "resize-y min-h-[120px]")}
                  placeholder="Tell me about the role or project..."
                />
              </div>
            </div>

            {feedback ? (
              <p
                role="status"
                className={cn(
                  "mt-5 text-sm",
                  status === "error" ? "text-red-400" : "text-accent",
                )}
              >
                {feedback}
              </p>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "loading"}
              className="mt-6 w-full sm:w-auto"
            >
              {status === "loading" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {status === "loading"
                ? "Sending…"
                : status === "sent"
                  ? "Sent"
                  : "Send Message"}
            </Button>
          </form>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";
