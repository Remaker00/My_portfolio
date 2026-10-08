"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { sendMessage, type SendResult } from "./send-message";

const fieldClass =
  "w-full border-b border-rule bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-dim/60 focus:border-signal focus-visible:outline-none";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setPending(true);
    setResult(null);
    const outcome = await sendMessage({
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      message: String(data.get("message")).trim(),
    });
    setPending(false);
    setResult(outcome);
    if (outcome.ok) form.reset();
  }

  return (
    <Section id="contact" index="05" title="Contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
            Have a frontend that needs to ship? <span className="text-signal">Let&rsquo;s talk.</span>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm break-all underline decoration-rule underline-offset-4 hover:decoration-signal"
          >
            {profile.email}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </a>
        </div>

        <form onSubmit={onSubmit} className="space-y-6" aria-describedby="contact-status">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-xs text-dim">name</span>
              <input name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className="block">
              <span className="font-mono text-xs text-dim">email</span>
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </label>
          </div>
          <label className="block">
            <span className="font-mono text-xs text-dim">message</span>
            <textarea name="message" required rows={4} className={cn(fieldClass, "resize-none")} />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
            <p id="contact-status" role="status" className="font-mono text-xs">
              {result?.ok && result.via === "web3forms" && <span className="text-pass">✓ Sent. I&rsquo;ll reply soon.</span>}
              {result?.ok && result.via === "gmail" && <span className="text-dim">Opened Gmail with your message.</span>}
              {result && !result.ok && <span className="text-warn">{result.error}</span>}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
