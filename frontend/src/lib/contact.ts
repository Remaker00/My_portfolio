import { siteConfig } from "@/constants/site";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactResult =
  | { ok: true; method: "web3forms" }
  | { ok: true; method: "gmail" }
  | { ok: false; error: string };

export function getGmailComposeUrl({ name, email, message }: ContactFormData) {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n---\nFrom: ${name}\nReply to: ${email}`,
  );

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${subject}&body=${body}`;
}

export async function sendContactMessage(
  data: ContactFormData,
): Promise<ContactResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    window.open(getGmailComposeUrl(data), "_blank", "noopener,noreferrer");
    return { ok: true, method: "gmail" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio contact from ${data.name}`,
        name: data.name,
        email: data.email,
        replyto: data.email,
        message: data.message,
        from_name: data.name,
        botcheck: "",
      }),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (result.success) {
      return { ok: true, method: "web3forms" };
    }

    window.open(getGmailComposeUrl(data), "_blank", "noopener,noreferrer");
    return {
      ok: false,
      error: result.message ?? "Could not send via form. Opened Gmail instead.",
    };
  } catch {
    window.open(getGmailComposeUrl(data), "_blank", "noopener,noreferrer");
    return {
      ok: false,
      error: "Network error. Opened Gmail so you can send manually.",
    };
  }
}
