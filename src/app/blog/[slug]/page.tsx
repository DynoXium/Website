"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Gamepad2,
  Cpu,
  Globe,
  Info,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { BLOG_POSTS } from "../page";

export default function BlogPostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="relative w-full min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-4 reveal-up">
          <h1 className="font-norwester text-4xl text-white uppercase reveal-up delay-75">Article Not Found</h1>
          <p className="text-sm text-text-muted max-w-md mx-auto reveal-up delay-100">
            The blog post you are looking for might have been moved, renamed, or deleted.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold text-xs uppercase tracking-wider hover:bg-transparent hover:text-primary-cyan transition-all reveal-up delay-150"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const theme = post.theme;
  let borderGlow = "border-primary-cyan/20 shadow-[0_0_30px_rgba(108,244,255,0.05)]";
  let tagColor = "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20";
  if (theme === "red") {
    borderGlow = "border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]";
    tagColor = "bg-red-500/10 text-red-400 border-red-500/20";
  } else if (theme === "green") {
    borderGlow = "border-success-teal/20 shadow-[0_0_30px_rgba(0,229,163,0.05)]";
    tagColor = "bg-success-teal/10 text-success-teal border-success-teal/20";
  } else if (theme === "amber") {
    borderGlow = "border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]";
    tagColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  }

  let Icon = BookOpen;
  if (post.category === "Gaming") Icon = Gamepad2;
  else if (post.category === "VPS") Icon = Cpu;
  else if (post.category === "Web Hosting") Icon = Globe;
  else if (post.category === "Company") Icon = Info;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Static Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[120px]" />
      </div>

      {/* TOP HEADER CONTROLS */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-6 relative z-20 flex justify-between items-center reveal-up">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-lg border border-[#2A3650]/60 bg-[#0E1321]/60 flex items-center justify-center text-text-muted hover:text-white hover:border-primary-cyan/40 transition-all"
            title="Share Article"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-20 space-y-8">
        {/* Article Meta Header */}
        <div className="space-y-4 reveal-up delay-75">
          <div className="flex items-center gap-3 reveal-up delay-100">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${tagColor}`}>
              <Icon className="h-3 w-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-norwester text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight tracking-wide reveal-up delay-150">
            {post.title}
          </h1>

          {/* Author Details & Date */}
          <div className="flex items-center gap-3 border-y border-[#2A3650]/40 py-4 reveal-up delay-200">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              theme === "red" ? "bg-red-500/10 text-red-400 border-red-500/20"
                : theme === "green" ? "bg-success-teal/10 text-success-teal border-success-teal/20"
                : theme === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20"
            }`}>
              <User className="h-5 w-5" />
            </div>
            <div className="flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-none">{post.author.name}</div>
                <div className="text-[10px] text-text-muted leading-none mt-1">{post.author.role}</div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div 
          className={`metallic-card p-6 sm:p-10 rounded-3xl border bg-[#0E1321]/60 font-sans font-medium text-sm sm:text-base text-[#D0D6E2] leading-relaxed space-y-6 blog-content-styles reveal-up delay-100 ${borderGlow}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Banner at bottom */}
        <div className="bg-gradient-to-br from-[#0E1321]/90 to-[#141B30]/75 rounded-2xl border border-primary-cyan/25 p-8 shadow-[0_0_40px_rgba(108,244,255,0.08)] relative overflow-hidden reveal-scale delay-150">
          <div className="absolute inset-0 bg-grid-pattern-sm opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h3 className="font-norwester text-xl text-white uppercase tracking-wider">Ready to host your project?</h3>
              <p className="text-xs text-text-muted max-w-lg leading-relaxed">
                DynoXium provides high-performance servers, game configurations, and developer web panel setups with a generous freemium tier.
              </p>
            </div>
            <Link
              href="/game"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-primary-cyan border border-primary-cyan text-black font-bold text-xs uppercase tracking-wider hover:bg-transparent hover:text-primary-cyan transition-all shadow-[0_0_15px_rgba(108,244,255,0.25)] flex-shrink-0"
            >
              <span>Deploy Server</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
