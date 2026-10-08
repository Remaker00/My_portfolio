import { profile } from "@/content/profile";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type SendResult =
  | { ok: true; via: "web3forms" | "gmail" }
  | { ok: false; error: string };

export function gmailComposeUrl({ name, email, message }: ContactMessage) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: profile.email,
    su: `Portfolio contact from ${name}`,
    body: `${message}\n\n---\nFrom: ${name}\nReply to: ${email}`,
  });
  return `https://mail.google.com/mail/?${params}`;
}

function openGmail(data: ContactMessage) {
  window.open(gmailComposeUrl(data), "_blank", "noopener,noreferrer");
}

/** Sends via Web3Forms when a key is configured, otherwise hands off to Gmail. */
export async function sendMessage(data: ContactMessage): Promise<SendResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    openGmail(data);
    return { ok: true, via: "gmail" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio contact from ${data.name}`,
        from_name: data.name,
        replyto: data.email,
        botcheck: "",
        ...data,
      }),
    });
    const result = (await response.json()) as { success?: boolean; message?: string };

    if (result.success) return { ok: true, via: "web3forms" };

    openGmail(data);
    return { ok: false, error: result.message ?? "The form service refused the message. Gmail opened instead." };
  } catch {
    openGmail(data);
    return { ok: false, error: "Network error. Gmail opened so you can send it directly." };
  }
}
