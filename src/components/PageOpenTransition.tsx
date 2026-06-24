"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const TOOLS_SCROLL_KEY = "tools-scroll-y";
const RESCAN_EVENT = "scrollreveal:rescan";

function requestRevealRescan() {
  window.dispatchEvent(new Event(RESCAN_EVENT));
}

function restoreScrollPosition(y: number) {
  const apply = () => {
    window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
  };

  apply();
  requestAnimationFrame(apply);
  [0, 50, 100, 200, 400, 600].forEach((ms) => setTimeout(apply, ms));
}

export default function PageOpenTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Keep tools catalog scroll position updated while the user is on /tools
  useEffect(() => {
    if (pathname !== "/tools") return;

    const saveScroll = () => {
      sessionStorage.setItem(TOOLS_SCROLL_KEY, String(window.scrollY));
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    document.addEventListener("click", saveScroll, { capture: true });
    return () => {
      window.removeEventListener("scroll", saveScroll);
      document.removeEventListener("click", saveScroll, { capture: true });
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.body.classList.add("nav-scroll-lock");
    document.body.classList.remove("scrolling-up");

    const returningToToolsFromTool =
      pathname === "/tools" && prev.startsWith("/tools/") && prev !== "/tools";

    const finishNavigationScroll = (y: number) => {
      if (y > 0) {
        restoreScrollPosition(y);
      } else {
        window.scrollTo(0, 0);
      }

      requestAnimationFrame(() => {
        document.body.classList.remove("scrolling-up");
        document.body.classList.remove("nav-scroll-lock");
        requestRevealRescan();
        setTimeout(requestRevealRescan, 100);
        setTimeout(requestRevealRescan, 300);
      });
    };

    if (returningToToolsFromTool) {
      const saved = sessionStorage.getItem(TOOLS_SCROLL_KEY);
      const y = saved !== null ? parseInt(saved, 10) : 0;
      finishNavigationScroll(Number.isNaN(y) ? 0 : y);
      return;
    }

    finishNavigationScroll(0);
  }, [pathname]);

  return (
    <div key={pathname} className="page-open-rise">
      {children}
    </div>
  );
}
