import { profile } from "@/content/profile";
import { buildInfo } from "@/lib/build-info";

export function Footer() {
  return (
    <footer className="border-t border-rule py-10 font-mono text-xs leading-relaxed text-dim">
      <p>
        © {new Date(buildInfo.builtAt).getUTCFullYear()} {profile.name} ·{" "}
        <a href={profile.links.source} className="text-ink underline-offset-4 hover:underline">
          Read the source
        </a>
      </p>
    </footer>
  );
}
