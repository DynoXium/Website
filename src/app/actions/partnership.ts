"use server";

import { headers } from "next/headers";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";

  // OS detection
  if (/windows/i.test(ua)) {
    const winMatch = ua.match(/Windows NT ([\d.]+)/i);
    if (winMatch) {
      const version = winMatch[1];
      if (version === "10.0") {
        os = "Windows 10/11";
      } else if (version === "6.3") {
        os = "Windows 8.1";
      } else if (version === "6.2") {
        os = "Windows 8";
      } else if (version === "6.1") {
        os = "Windows 7";
      } else {
        os = `Windows NT ${version}`;
      }
    } else {
      os = "Windows";
    }
  } else if (/android/i.test(ua)) {
    const androidMatch = ua.match(/Android ([\d.]+)/i);
    os = androidMatch ? `Android ${androidMatch[1]}` : "Android";
  } else if (/ipad|iphone|ipod/i.test(ua)) {
    const iosMatch = ua.match(/OS ([\d_]+) like/i);
    os = iosMatch ? `iOS ${iosMatch[1].replace(/_/g, ".")}` : "iOS";
  } else if (/macintosh/i.test(ua)) {
    const macMatch = ua.match(/Mac OS X ([\d_.]+)/i);
    os = macMatch ? `macOS ${macMatch[1].replace(/_/g, ".")}` : "macOS";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  // Browser detection
  if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/firefox/i.test(ua)) browser = "Firefox";

  return { browser, os };
}

// In-memory rate limiting map
interface RateLimitEntry {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const limit = 3;

  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitMap.set(ip, entry);
  }

  // Filter out timestamps older than 15 minutes
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    return true;
  }

  entry.timestamps.push(now);
  return false;
}

export async function submitPartnership(
  formData: {
    name: string;
    email: string;
    platform: string;
    channelUrl: string;
    audienceSize: string;
    message: string;
  },
  token: string
) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL environment variable is not defined");
    return { success: false, error: "Configuration error" };
  }

  // Get Client Headers
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const ip = headerList.get("x-forwarded-for")?.split(",")[0].trim() || headerList.get("x-real-ip") || "127.0.0.1";

  // Check rate limit
  if (isRateLimited(ip)) {
    return { 
      success: false, 
      error: "Too many applications submitted from your network. Please try again in 15 minutes." 
    };
  }

  // Verify Turnstile Token
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("TURNSTILE_SECRET_KEY environment variable is not defined");
    return { success: false, error: "Configuration error" };
  }

  if (!token) {
    return { success: false, error: "Security verification token is missing. Please try again." };
  }

  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`,
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return { success: false, error: "Security check failed. Please refresh and try again." };
    }
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return { success: false, error: "Security verification service unavailable." };
  }

  // Fetch GeoIP information
  let geoInfo: any = {};
  if (ip && ip !== "127.0.0.1" && ip !== "::1") {
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,as,mobile,proxy`, {
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      if (geoRes.ok) {
        geoInfo = await geoRes.json();
      }
    } catch (e) {
      console.error("GeoIP lookup failed:", e);
    }
  }

  const location = geoInfo.status === "success"
    ? `${geoInfo.city || ""}, ${geoInfo.regionName || ""}, ${geoInfo.country || ""}`.trim()
    : "Unknown";
  const provider = geoInfo.status === "success"
    ? `${geoInfo.isp || ""} (${geoInfo.as || ""})`
    : "Unknown";
  const connectionType = geoInfo.status === "success"
    ? (geoInfo.mobile ? "Wireless (Mobile)" : "Wired / Broadband")
    : "Unknown";
  const isVpn = geoInfo.status === "success"
    ? (geoInfo.proxy ? "yes" : "no")
    : "no";

  const { browser, os } = parseUserAgent(userAgent);

  try {
    const payload = {
      embeds: [
        {
          title: "🌟 New Partnership Application",
          color: 458495, // 0x06FFBF or similar cyan-ish/teal
          fields: [
            { name: "👤 Name", value: `**${formData.name}**`, inline: true },
            { name: "📧 Email", value: `**${formData.email}**`, inline: true },
            { name: "🌐 Platform", value: `**${formData.platform}**`, inline: true },
            { name: "🔗 Channel/Website URL", value: formData.channelUrl },
            { name: "📊 Audience/Subscriber Count", value: `**${formData.audienceSize}**` },
            { name: "📝 Message & Plans", value: `>>> ${formData.message}` },
            { name: "🏢 Provider", value: `\`${provider}\``, inline: true },
            { name: "📍 Location", value: `\`${location}\``, inline: true },
            { name: "🌐 IP Address", value: `|| \`${ip}\` ||`, inline: true },
            { name: "📶 Connection Info", value: `Type: \`${connectionType}\`\nVPN: \`${isVpn}\``, inline: true },
            { name: "💻 Device Info", value: `Browser: \`${browser}\`\nOS: \`${os}\``, inline: true }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "DynoXium Partnership System",
          }
        }
      ]
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Discord returned status ${res.status}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Webhook submission error:", err);
    return { success: false, error: err.message || "Failed to submit application" };
  }
}
