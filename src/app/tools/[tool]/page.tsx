import McStatus from "../mc-status";
import Motd from "../motd";
import Uuid from "../uuid";
import Skin from "../skin";
import Circle from "../circle";
import Whitelist from "../whitelist";
import Nbt from "../nbt";
import ServerProperties from "../server-properties";
import CoordinateCalculator from "../coordinate-calculator";
import TickCalculator from "../tick-calculator";
import BackgroundShapes from "@/components/BackgroundShapes";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    tool: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { tool: "mc-status" },
    { tool: "motd" },
    { tool: "uuid" },
    { tool: "skin" },
    { tool: "circle" },
    { tool: "whitelist" },
    { tool: "nbt" },
    { tool: "server-properties" },
    { tool: "coordinate-calculator" },
    { tool: "tick-calculator" },
  ];
}

export default async function ToolDynamicPage({ params }: PageProps) {
  const { tool } = await params;

  let content;
  switch (tool) {
    case "mc-status":
      content = <McStatus />;
      break;
    case "motd":
      content = <Motd />;
      break;
    case "uuid":
      content = <Uuid />;
      break;
    case "skin":
      content = <Skin />;
      break;
    case "circle":
      content = <Circle />;
      break;
    case "whitelist":
      content = <Whitelist />;
      break;
    case "nbt":
      content = <Nbt />;
      break;
    case "server-properties":
      content = <ServerProperties />;
      break;
    case "coordinate-calculator":
      content = <CoordinateCalculator />;
      break;
    case "tick-calculator":
      content = <TickCalculator />;
      break;
    default:
      notFound();
  }

  return (
    <>
      <BackgroundShapes pageId={tool} />
      {content}
    </>
  );
}
