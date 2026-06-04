"use client";

import dynamic from "next/dynamic";

const SmoothScrollProvider = dynamic(
  () =>
    import("@/components/providers/SmoothScrollProvider").then((m) => ({
      default: m.SmoothScrollProvider,
    })),
  { ssr: false }
);

export function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
