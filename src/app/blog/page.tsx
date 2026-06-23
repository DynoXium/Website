"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Cpu,
  Globe,
  Info,
  BookOpen,
} from "lucide-react";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: "Gaming" | "VPS" | "Web Hosting" | "Company";
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  theme: "red" | "green" | "amber" | "cyan";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "introducing-dynoxium-cloud-hosting",
    title: "Introducing DynoXium: The Freemium All-In-One Cloud Platform",
    excerpt: "Discover how we are redefining game, VPS, and web hosting with high-performance nodes, a unified control panel, and a commitment to developer freedom.",
    content: `
      <p class="lead">Today marks a significant milestone for developers, gamers, and businesses worldwide. We are thrilled to officially launch <strong>DynoXium</strong>, a freemium all-in-one cloud hosting platform engineered for unmatched speed, reliability, and accessibility.</p>
      
      <h3>Why DynoXium?</h3>
      <p>Historically, hosting has been highly fragmented. If you wanted to run a Minecraft server for your friends, deploy a Next.js web application for your SaaS, and configure a VPS database node, you had to deal with three different providers, multiple billing systems, and mismatched panels. DynoXium solves this by unifying all cloud hosting needs into one premium control console.</p>
      
      <blockquote>
        "Our mission is to democratize high-performance cloud infrastructure. Whether you're running a free bot or hosting a massive multiplayer community, you deserve stable nodes and fast response times."
        <cite>— Kr Arjan, Founder of DynoXium</cite>
      </blockquote>

      <h3>Cutting-Edge Infrastructure</h3>
      <p>Every node on our network is powered by enterprise-grade hardware. We utilize high-frequency AMD Ryzen and Intel Xeon processors, ultra-fast NVMe SSDs in RAID configurations, and robust DDoS protection systems. Our networks feature multiple 100Gbps backbones configured to deliver sub-millisecond latencies across global regions.</p>
      
      <h3>Freemium Access That Actually Works</h3>
      <p>Unlike other platforms that restrict free tier servers to sluggish, unusable resources, DynoXium's free tier provides robust cores and dedicated memory limits, perfect for hobbyists, test environments, and Discord bot hosting. We believe that financial constraints shouldn't halt innovation.</p>

      <h3>What's Next?</h3>
      <p>We are constantly expanding our node clusters. Next month, we will be rolling out automated Modpack installations for more than 50+ games, edge CDN routing for web hosting, and advanced firewall rule management directly from the console dashboard. Stay tuned!</p>
    `,
    date: "June 22, 2026",
    readTime: "4 min read",
    category: "Company",
    author: {
      name: "Kr Arjan",
      role: "Founder & Lead Architect",
    },
    tags: ["Cloud", "Launch", "Freemium"],
    theme: "cyan",
  },
  {
    slug: "achieving-ultra-low-latency-minecraft",
    title: "Achieving Ultra-Low Latency Minecraft Server Hosting",
    excerpt: "Under the hood of our gaming network: How we optimized network packet routing and resource allocation to deliver green pings to every player.",
    content: `
      <p class="lead">In competitive multiplayer games, millisecond delays mean the difference between victory and defeat. Here is how we optimized DynoXium's nodes to deliver industry-leading low latency for gaming servers.</p>
      
      <h3>Optimizing Network Packet Routing</h3>
      <p>Most game hosting platforms purchase cheap network transit that routes packets through long, congested channels. At DynoXium, we utilize premium BGP (Border Gateway Protocol) routing. We partner with Tier-1 network transit providers to ensure packets take the shortest physical path from the player's router to our server cabinets.</p>
      
      <h3>Hardware Allocation & Throttling Prevention</h3>
      <p>Minecraft is historically single-threaded, meaning core processor speed matters significantly more than the number of cores. We host our gaming nodes exclusively on high-frequency CPUs (up to 4.5GHz boost clocks). We run strict container orchestration to prevent neighboring servers from leaking CPU load or causing disk I/O bottlenecks.</p>

      <div class="tip-box">
        <h4>Pro Tip: Use PaperMC or Purpur</h4>
        <p>If you're running a modded or high-player count server, avoid vanilla server files. Switching to PaperMC or Purpur can reduce tick overhead by up to 40% through intelligent entity chunk tick calculations.</p>
      </div>

      <h3>DDoS Protection Without Packet Dropping</h3>
      <p>Standard DDoS mitigation filters out packet traffic aggressively, often causing high packet loss during normal gameplay. Our advanced edge scrubbing centers detect and isolate malicious attack traffic in real-time, filtering out bad requests under 2 seconds while keeping normal game traffic uninterrupted.</p>
    `,
    date: "June 18, 2026",
    readTime: "5 min read",
    category: "Gaming",
    author: {
      name: "Rohan Das",
      role: "Systems Operations Engineer",
    },
    tags: ["Gaming", "Network", "Minecraft"],
    theme: "green",
  },
  {
    slug: "deploying-nextjs-apps-git-integration",
    title: "Deploying Next.js Applications with Git Integration",
    excerpt: "Learn how to link your GitHub repository to the DynoXium Web Panel for automated production deployments and free wildcard SSL certificates.",
    content: `
      <p class="lead">Deploying modern React and Next.js applications shouldn't require complex CI/CD configurations. Our Git integration deploys your code directly on push. Here is the complete step-by-step setup.</p>
      
      <h3>Step 1: Link Your Repository</h3>
      <p>Log in to your DynoXium Web Panel, navigate to "Websites" and select "Add New App". Choose the "Git Deployment" option, authorize your GitHub account, and select the branch you wish to track (e.g. main or production).</p>
      
      <h3>Step 2: Define Environment Variables</h3>
      <p>If your application depends on database connections, API keys, or private client secrets, configure them under the "Environment Variables" tab. These are securely encrypted on our database node and injected into your container during the build phase.</p>

      <h3>Step 3: Push to Deploy</h3>
      <p>Every time you run <code>git push origin main</code>, our build hooks intercept the commit, launch a clean container, pull dependencies, compile assets, and hot-swap the server instance with zero downtime.</p>

      <h3>Wildcard Let's Encrypt SSL</h3>
      <p>Once deployed, your domain is automatically configured with a free Let's Encrypt SSL certificate. Our reverse proxies handle SSL termination, redirecting all HTTP traffic to HTTPS securely.</p>
    `,
    date: "June 14, 2026",
    readTime: "3 min read",
    category: "Web Hosting",
    author: {
      name: "Sarah Jenkins",
      role: "Frontend Engineer",
    },
    tags: ["Next.js", "Git", "Web Dev"],
    theme: "amber",
  },
];

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");

  const categories = ["All", "Gaming", "VPS", "Web Hosting", "Company"];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        const matched = categories.find(
          (c) => c.toLowerCase() === categoryParam.toLowerCase()
        );
        if (matched) {
          setActiveCategory(matched);
        }
      }
    }
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = searchQuery.trim() === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Static Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-primary-cyan/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary-cyan/3 rounded-full blur-[120px]" />

        {/* Rotating Vector Rings */}
        <div className="absolute -left-20 top-48 w-80 h-80 rounded-full border border-primary-cyan/5 animate-spin-slow" />
        <div className="absolute -right-20 bottom-48 w-80 h-80 rounded-full border border-dashed border-[#3388FF]/5 animate-spin-reverse" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-cyan/45 bg-[#141C2F]/80 text-xs sm:text-sm font-mono font-bold text-primary-cyan uppercase mb-6 tracking-widest shadow-[0_0_15px_rgba(108,244,255,0.15)]">
          Latest News & Guides
        </div>
        <h1 className="font-norwester text-3xl sm:text-7xl md:text-8xl tracking-wide sm:tracking-widest text-white mb-6 uppercase leading-none break-words">
          DynoXium <span className="text-primary-cyan drop-shadow-[0_0_30px_rgba(108,244,255,0.3)]">Blog</span>
        </h1>
        <p className="text-base sm:text-lg text-text-muted/90 max-w-3xl mx-auto font-sans leading-relaxed font-medium">
          Insights, tutorials, and engineering deep-dives from the developers behind DynoXium cloud infrastructure.
        </p>
      </section>

      {/* FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-20">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0E1321]/60 border border-[#2A3650]/60 p-4 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary-cyan text-black shadow-[0_0_15px_rgba(108,244,255,0.3)]"
                    : "text-text-muted hover:text-white hover:bg-[#161C2C]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search articles or tags..."
              value={searchQuery.trim()}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131929] border border-[#2A3650]/60 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-text-muted focus:outline-none focus:border-primary-cyan/40 transition-all font-sans"
            />
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 relative z-20">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const theme = post.theme;
              let cardGlow = "hover:border-primary-cyan/40 hover:shadow-[0_0_30px_rgba(108,244,255,0.06)]";
              if (theme === "red") cardGlow = "hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]";
              else if (theme === "green") cardGlow = "hover:border-success-teal/40 hover:shadow-[0_0_30px_rgba(0,229,163,0.06)]";
              else if (theme === "amber") cardGlow = "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]";

              let tagColor = "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20";
              if (theme === "red") tagColor = "bg-red-500/10 text-red-400 border-red-500/20";
              else if (theme === "green") tagColor = "bg-success-teal/10 text-success-teal border-success-teal/20";
              else if (theme === "amber") tagColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";

              let Icon = BookOpen;
              if (post.category === "Gaming") Icon = Gamepad2;
              else if (post.category === "VPS") Icon = Cpu;
              else if (post.category === "Web Hosting") Icon = Globe;
              else if (post.category === "Company") Icon = Info;

              return (
                <div
                  key={post.slug}
                  className={`metallic-card rounded-2xl border border-[#2A3650]/60 bg-[#0E1321]/50 p-6 flex flex-col justify-between space-y-5 transition-all duration-500 ${cardGlow}`}
                >
                  <div className="space-y-4">
                    {/* Header: Category Badge & Read Time */}
                    <div className="flex justify-between items-center">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${tagColor}`}>
                        <Icon className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight line-clamp-2 hover:text-primary-cyan transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans font-medium line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer info: Author, Date & Button */}
                  <div className="border-t border-[#2A3650]/40 pt-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                          theme === "red" ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : theme === "green" ? "bg-success-teal/10 text-success-teal border-success-teal/20"
                            : theme === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20"
                        }`}>
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-white leading-none">{post.author.name}</span>
                          <span className="text-[9px] text-text-muted leading-none mt-0.5">{post.author.role}</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-[9px] text-text-muted font-mono">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border font-bold text-xs transition-all ${
                        theme === "red" ? "bg-red-950/20 border-red-500/30 text-red-400 hover:border-red-500/60"
                          : theme === "green" ? "bg-emerald-950/20 border-success-teal/30 text-success-teal hover:border-success-teal/60"
                          : theme === "amber" ? "bg-amber-950/20 border-amber-500/30 text-amber-400 hover:border-amber-500/60"
                          : "bg-blue-950/20 border-primary-cyan/30 text-primary-cyan hover:border-primary-cyan/60"
                      }`}
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0E1321]/40 border border-[#2A3650]/40 rounded-2xl max-w-lg mx-auto space-y-4">
            <Info className="h-10 w-10 text-text-muted mx-auto" />
            <h3 className="font-display text-white text-lg font-bold uppercase tracking-wide">No Articles Found</h3>
            <p className="text-xs text-text-muted leading-relaxed font-sans max-w-sm mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try selecting another category or check your search terms.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
