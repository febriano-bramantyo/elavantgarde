import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const DATA_FILE = path.resolve(process.cwd(), "leads.json");

interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  whatsapp: string;
  unit_type: string;
  budget: string;
  visit_time: string;
  lang: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    full_name: "Hendra Wijaya",
    whatsapp: "+62 812-8890-4421",
    unit_type: "The Monarch",
    budget: "> Rp 5 M",
    visit_time: "weekendAM",
    lang: "id",
  },
  {
    id: "lead-2",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    full_name: "Clarissa Tanoto",
    whatsapp: "+62 811-9402-1180",
    unit_type: "The Champagne",
    budget: "Rp 4 – 5 M",
    visit_time: "weekdayPM",
    lang: "en",
  },
  {
    id: "lead-3",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    full_name: "Dimas Prasetyo",
    whatsapp: "+62 813-1778-9023",
    unit_type: "The Onyx",
    budget: "Rp 3 – 4 M",
    visit_time: "weekendPM",
    lang: "id",
  },
];

function readLeads(): Lead[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return [...INITIAL_LEADS];
}

function writeLeads(leads: Lead[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch {
    // ignore write error
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/leads", (req, res) => {
    const adminKey = req.header("X-Admin-Key") || "";
    const expectedKey = process.env.ADMIN_KEY;
    if (expectedKey && adminKey !== expectedKey) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!adminKey.trim()) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.json(readLeads());
  });

  app.post("/api/leads", (req, res) => {
    const { full_name, whatsapp, unit_type, budget, visit_time, lang } = req.body || {};
    if (!full_name || !whatsapp || !unit_type || !budget || !visit_time) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const leads = readLeads();
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      full_name: String(full_name).trim(),
      whatsapp: String(whatsapp).trim(),
      unit_type: String(unit_type),
      budget: String(budget),
      visit_time: String(visit_time),
      lang: String(lang || "id"),
    };
    leads.unshift(newLead);
    writeLeads(leads);
    res.status(201).json(newLead);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
