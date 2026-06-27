"use server";

import { headers } from "next/headers";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";

  // OS detection
  if (/windows/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/ipad|iphone|ipod/i.test(ua)) os = "iOS";
  else if (/macintosh/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser detection
  if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/firefox/i.test(ua)) browser = "Firefox";

  return { browser, os };
}

export async function submitPartnership(formData: {
  name: string;
  email: string;
  platform: string;
  channelUrl: string;
  audienceSize: string;
  message: string;
}) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL environment variable is not defined");
    return { success: false, error: "Configuration error" };
  }

  // Get Client Headers
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const ip = headerList.get("x-forwarded-for")?.split(",")[0].trim() || headerList.get("x-real-ip") || "127.0.0.1";

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
            { name: "👤 Name", value: formData.name, inline: true },
            { name: "📧 Email", value: formData.email, inline: true },
            { name: "🌐 Platform", value: formData.platform, inline: true },
            { name: "🔗 Channel/Website URL", value: formData.channelUrl },
            { name: "📊 Audience/Subscriber Count", value: formData.audienceSize },
            { name: "📝 Message & Plans", value: formData.message },
            { name: "🌐 IP Address", value: ip, inline: true },
            { name: "📍 Location", value: location, inline: true },
            { name: "🏢 Provider", value: provider, inline: true },
            { name: "📶 Connection Info", value: `Type: ${connectionType}\nVPN: ${isVpn}`, inline: true },
            { name: "💻 Device Info", value: `Browser: ${browser}\nOS: ${os}`, inline: true }
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
