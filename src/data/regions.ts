export interface Region {
  id: string;
  name: string;
  code: string;
  subRegion: string;
  status: "Live" | "Coming Soon";
  locations: { name: string; status: "Live" | "Coming Soon" }[];
  coordinates: { x: number; y: number }; // Percentage coordinates on the SVG map
  datacenterName: string;
  latency: string;
  optimalColor: "green" | "blue" | "red";
}

export const regionsData: Region[] = [
  {
    id: "india",
    name: "India",
    code: "ASIA SOUTH",
    subRegion: "South Asia Core",
    status: "Live",
    locations: [
      { name: "Mumbai", status: "Live" },
      { name: "Noida", status: "Coming Soon" },
    ],
    coordinates: { x: 71.9, y: 58.3 },
    datacenterName: "Mumbai Datacenter Cluster",
    latency: "14ms",
    optimalColor: "green",
  },
  {
    id: "singapore",
    name: "Singapore",
    code: "ASIA SOUTHEAST",
    subRegion: "Downtown Core",
    status: "Coming Soon",
    locations: [{ name: "Downtown Core", status: "Coming Soon" }],
    coordinates: { x: 78.7, y: 59.0 },
    datacenterName: "Equinix SG2 Edge Cluster",
    latency: "32ms",
    optimalColor: "green",
  },
  {
    id: "usa",
    name: "USA",
    code: "US WEST / EAST",
    subRegion: "US Network Edge",
    status: "Coming Soon",
    locations: [{ name: "California", status: "Coming Soon" }],
    coordinates: { x: 15.2, y: 25.8 },
    datacenterName: "Oregon High-Memory Cluster",
    latency: "112ms",
    optimalColor: "blue",
  },
  {
    id: "germany",
    name: "Germany",
    code: "EU WEST",
    subRegion: "Europe Core",
    status: "Coming Soon",
    locations: [{ name: "Frankfurt", status: "Coming Soon" }],
    coordinates: { x: 49.9, y: 31.0 },
    datacenterName: "Frankfurt FR5 Cloud Cluster",
    latency: "88ms",
    optimalColor: "blue",
  },
];
