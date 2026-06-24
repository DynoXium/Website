"use client";

import { usePathname } from "next/navigation";
import BackgroundShapes from "./BackgroundShapes";

export default function GlobalBackground() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  // Resolve pageId from pathname
  // E.g., "/tools/mc-status" -> "mc-status"
  // E.g., "/vps" -> "vps"
  const segments = pathname.split("/").filter(Boolean);
  const pageId = segments[segments.length - 1] || "default";

  return <BackgroundShapes key={pageId} pageId={pageId} />;
}
