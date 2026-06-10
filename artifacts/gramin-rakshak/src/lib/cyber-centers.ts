export type CyberCenter = {
  id: number;
  district: string;
  state: string;
  unit: string;
  address: string;
  phone: string;
  pinPrefixes: string[];
};

export const CYBER_CENTERS: CyberCenter[] = [
  // ── Andhra Pradesh ─────────────────────────────────────────
  {
    id: 1,
    district: "Visakhapatnam",
    state: "Andhra Pradesh",
    unit: "CCS Cyber Crime Unit, Visakhapatnam",
    address: "Commissioner of Police Office, Sarojini Devi Road, Visakhapatnam – 530001",
    phone: "0891-2754970",
    pinPrefixes: ["530", "531"],
  },
  {
    id: 2,
    district: "Vijayawada",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Police Station, Krishna",
    address: "Commissioner of Police Office, MG Road, Vijayawada – 520010",
    phone: "0866-2577777",
    pinPrefixes: ["520", "521"],
  },
  {
    id: 3,
    district: "Guntur",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Guntur",
    address: "SP Office Campus, Arundelpet, Guntur – 522002",
    phone: "0863-2234567",
    pinPrefixes: ["522", "523"],
  },
  {
    id: 4,
    district: "Tirupati",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Police Station, Tirupati",
    address: "SP Office, Renigunta Road, Tirupati – 517501",
    phone: "0877-2230999",
    pinPrefixes: ["517"],
  },
  {
    id: 5,
    district: "Kurnool",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Kurnool",
    address: "SP Office, Fort Road, Kurnool – 518001",
    phone: "08518-222444",
    pinPrefixes: ["518"],
  },
  {
    id: 6,
    district: "Nellore",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, SPSR Nellore",
    address: "SP Office, Magunta Layout, Nellore – 524001",
    phone: "0861-2334455",
    pinPrefixes: ["524"],
  },
  {
    id: 7,
    district: "Kakinada",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, East Godavari",
    address: "SP Office, Kakinada – 533001",
    phone: "0884-2375100",
    pinPrefixes: ["533"],
  },
  {
    id: 8,
    district: "Rajahmundry",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Rajamahendravaram",
    address: "CP Office, T. Nagar, Rajahmundry – 533101",
    phone: "0883-2474100",
    pinPrefixes: ["533"],
  },
  {
    id: 9,
    district: "Kadapa",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, YSR Kadapa",
    address: "SP Office, Railway Station Road, Kadapa – 516001",
    phone: "08562-252444",
    pinPrefixes: ["516"],
  },
  {
    id: 10,
    district: "Anantapur",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Anantapur",
    address: "SP Office, Anantapur – 515001",
    phone: "08554-272555",
    pinPrefixes: ["515"],
  },
  {
    id: 11,
    district: "Srikakulam",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Srikakulam",
    address: "SP Office, Main Road, Srikakulam – 532001",
    phone: "08942-220111",
    pinPrefixes: ["532"],
  },
  {
    id: 12,
    district: "Vizianagaram",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, Vizianagaram",
    address: "SP Office, Vizianagaram – 535001",
    phone: "08922-225100",
    pinPrefixes: ["535"],
  },
  {
    id: 13,
    district: "Eluru",
    state: "Andhra Pradesh",
    unit: "Cyber Crime Cell, West Godavari",
    address: "SP Office, Eluru – 534001",
    phone: "08812-232444",
    pinPrefixes: ["534"],
  },

  // ── Telangana ───────────────────────────────────────────────
  {
    id: 14,
    district: "Hyderabad",
    state: "Telangana",
    unit: "Cyber Crime Police Station, Hyderabad",
    address: "CCS Building, Basheerbagh, Hyderabad – 500004",
    phone: "040-27852585",
    pinPrefixes: ["500", "501", "502"],
  },
  {
    id: 15,
    district: "Warangal",
    state: "Telangana",
    unit: "Cyber Crime Cell, Warangal",
    address: "CP Office, Hanamkonda, Warangal – 506001",
    phone: "0870-2578888",
    pinPrefixes: ["506"],
  },
  {
    id: 16,
    district: "Nizamabad",
    state: "Telangana",
    unit: "Cyber Crime Cell, Nizamabad",
    address: "SP Office, Nizamabad – 503001",
    phone: "08462-225000",
    pinPrefixes: ["503"],
  },
  {
    id: 17,
    district: "Karimnagar",
    state: "Telangana",
    unit: "Cyber Crime Cell, Karimnagar",
    address: "SP Office, Karimnagar – 505001",
    phone: "0878-2225999",
    pinPrefixes: ["505"],
  },
  {
    id: 18,
    district: "Khammam",
    state: "Telangana",
    unit: "Cyber Crime Cell, Khammam",
    address: "SP Office, Khammam – 507001",
    phone: "08742-222333",
    pinPrefixes: ["507"],
  },
  {
    id: 19,
    district: "Nalgonda",
    state: "Telangana",
    unit: "Cyber Crime Cell, Nalgonda",
    address: "SP Office, Nalgonda – 508001",
    phone: "08682-225100",
    pinPrefixes: ["508"],
  },
  {
    id: 20,
    district: "Mahbubnagar",
    state: "Telangana",
    unit: "Cyber Crime Cell, Mahbubnagar",
    address: "SP Office, Mahbubnagar – 509001",
    phone: "08542-225444",
    pinPrefixes: ["509"],
  },

  // ── Other major cities ───────────────────────────────────────
  {
    id: 21,
    district: "Chennai",
    state: "Tamil Nadu",
    unit: "Cyber Crime Cell, Chennai",
    address: "CBCID Campus, Vepery, Chennai – 600007",
    phone: "044-28447777",
    pinPrefixes: ["600", "601", "602", "603"],
  },
  {
    id: 22,
    district: "Bengaluru",
    state: "Karnataka",
    unit: "Cyber Crime Police Station, Bengaluru",
    address: "CID Headquarters, Carlton House, Bengaluru – 560001",
    phone: "080-22094498",
    pinPrefixes: ["560", "561", "562"],
  },
  {
    id: 23,
    district: "Mumbai",
    state: "Maharashtra",
    unit: "Cyber Crime Cell, Mumbai",
    address: "Bandra-Kurla Complex, Bandra East, Mumbai – 400051",
    phone: "022-26573030",
    pinPrefixes: ["400", "401"],
  },
  {
    id: 24,
    district: "Delhi",
    state: "Delhi",
    unit: "Cyber Crime Unit, Delhi Police",
    address: "PHQ, ITO, New Delhi – 110002",
    phone: "011-23490009",
    pinPrefixes: ["110"],
  },
  {
    id: 25,
    district: "Kolkata",
    state: "West Bengal",
    unit: "Cyber Crime PS, Kolkata",
    address: "Lalbazar Police HQ, Kolkata – 700001",
    phone: "033-22143004",
    pinPrefixes: ["700", "701"],
  },
];

export function searchCenters(query: string): CyberCenter[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CYBER_CENTERS.filter((c) => {
    const pinMatch = /^\d+$/.test(q) && c.pinPrefixes.some((p) => q.startsWith(p) || p.startsWith(q));
    const textMatch =
      c.district.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.unit.toLowerCase().includes(q);
    return pinMatch || textMatch;
  });
}
