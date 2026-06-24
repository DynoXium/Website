"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR =
  ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale";

const RESCAN_EVENT = "scrollreveal:rescan";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight - 40 && rect.bottom > 0;
}

export default function ScrollReveal() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useIsomorphicLayoutEffect(() => {
    document.body.classList.remove("scrolling-up");

    if (pathnameRef.current !== pathname) {
      document
        .querySelectorAll(`${REVEAL_SELECTOR}.reveal-visible`)
        .forEach((el) => el.classList.remove("reveal-visible"));
      pathnameRef.current = pathname;
    }

    let observer: IntersectionObserver | null = null;
    const observed = new WeakSet<Element>();
    let mutationTimer: ReturnType<typeof setTimeout> | null = null;

    const revealInView = (el: Element) => {
      if (isInViewport(el)) {
        el.classList.add("reveal-visible");
      }
    };

    const scanAndObserve = () => {
      const reveals = document.querySelectorAll(REVEAL_SELECTOR);
      reveals.forEach((el) => {
        revealInView(el);
        if (!observed.has(el)) {
          observer?.observe(el);
          observed.add(el);
        }
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("reveal-visible");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    scanAndObserve();

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(scanAndObserve);
    });

    const retryTimers = [50, 150, 400, 800, 1200].map((ms) =>
      setTimeout(scanAndObserve, ms)
    );

    const onLoad = () => scanAndObserve();
    window.addEventListener("load", onLoad);

    const main = document.querySelector("main");
    const mutationObserver = main
      ? new MutationObserver(() => {
          if (mutationTimer) clearTimeout(mutationTimer);
          mutationTimer = setTimeout(scanAndObserve, 16);
        })
      : null;

    if (main && mutationObserver) {
      mutationObserver.observe(main, { childList: true, subtree: true });
    }

    const onRescan = () => scanAndObserve();
    window.addEventListener(RESCAN_EVENT, onRescan);

    return () => {
      cancelAnimationFrame(rafId);
      retryTimers.forEach(clearTimeout);
      if (mutationTimer) clearTimeout(mutationTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener(RESCAN_EVENT, onRescan);
      mutationObserver?.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  // Track scroll direction to toggle 'scrolling-up' class for disabling transition during scroll-up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      if (document.body.classList.contains("nav-scroll-lock")) {
        lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      if (scrollY < lastScrollY) {
        document.body.classList.add("scrolling-up");
      } else {
        document.body.classList.remove("scrolling-up");
      }
      lastScrollY = scrollY <= 0 ? 0 : scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
