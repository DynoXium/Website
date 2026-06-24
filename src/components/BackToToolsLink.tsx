import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToToolsLink() {
  return (
    <Link
      href="/tools"
      scroll={false}
      className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider group reveal-up"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Tools</span>
    </Link>
  );
}
