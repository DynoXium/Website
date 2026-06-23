import Vps from "../services/vps";
import Rdp from "../services/rdp";
import Web from "../services/web";
import Bot from "../services/bot";
import Free from "../services/free";

import About from "../company/about";
import Team from "../company/team";
import Partnership from "../company/partnership";
import Infrastructure from "../company/infrastructure";

import Knowledgebase from "../support/knowledgebase";
import Faq from "../support/faq";
import Contact from "../support/contact";

import Terms from "../legal/terms";
import Privacy from "../legal/privacy";
import Refund from "../legal/refund";
import Aup from "../legal/aup";

import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "vps" },
    { slug: "rdp" },
    { slug: "web" },
    { slug: "bot" },
    { slug: "free" },
    { slug: "about" },
    { slug: "team" },
    { slug: "partnership" },
    { slug: "infrastructure" },
    { slug: "knowledgebase" },
    { slug: "faq" },
    { slug: "contact" },
    { slug: "terms" },
    { slug: "privacy" },
    { slug: "refund" },
    { slug: "aup" },
  ];
}

export default async function DynamicRoutePage({ params }: PageProps) {
  const { slug } = await params;

  let content;
  switch (slug) {
    case "vps":
      content = <Vps />;
      break;
    case "rdp":
      content = <Rdp />;
      break;
    case "web":
      content = <Web />;
      break;
    case "bot":
      content = <Bot />;
      break;
    case "free":
      content = <Free />;
      break;
    case "about":
      content = <About />;
      break;
    case "team":
      content = <Team />;
      break;
    case "partnership":
      content = <Partnership />;
      break;
    case "infrastructure":
      content = <Infrastructure />;
      break;
    case "knowledgebase":
      content = <Knowledgebase />;
      break;
    case "faq":
      content = <Faq />;
      break;
    case "contact":
      content = <Contact />;
      break;
    case "terms":
      content = <Terms />;
      break;
    case "privacy":
      content = <Privacy />;
      break;
    case "refund":
      content = <Refund />;
      break;
    case "aup":
      content = <Aup />;
      break;
    default:
      notFound();
  }

  return content;
}
