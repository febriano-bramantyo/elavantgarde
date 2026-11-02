import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Download, LogOut, Lock, RefreshCw, Search, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const API = "/api";
const KEY = "ela_admin_key";
const TIMES = { weekdayAM: "Weekday — Morning", weekdayPM: "Weekday — Afternoon", weekendAM: "Weekend — Morning", weekendPM: "Weekend — Afternoon", undecided: "Not sure yet" };
const COLS = [["created_at", "Submitted"], ["full_name", "Full Name"], ["whatsapp", "WhatsApp"], ["unit_type", "Unit Type"], ["budget", "Budget"], ["visit_time", "Visit Time"], ["lang", "Lang"]];

const fmtDate = (iso) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
const cell = (lead, k) => (k === "created_at" ? fmtDate(lead[k]) : k === "visit_time" ? TIMES[lead[k]] || lead[k] : k === "lang" ? lead[k].toUpperCase() : lead[k]);
const waNumber = (n) => n.replace(/\D/g, "").replace(/^0/, "62");

const exportCsv = (leads) => {
  const esc = (v) => `"${String(v).replace(/^([=+\-@\t])/, "'$1").replace(/"/g, '""')}"`;
  const rows = [COLS.map(([, l]) => l), ...leads.map((l) => COLS.map(([k]) => cell(l, k)))];
  const blob = new Blob(["\uFEFF" + rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `el-avantgarde-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

const Login = ({ onSubmit, error, loading }) => {
  const [key, setKey] = useState("");
  return (
    <main data-testid="admin-login" className="min-h-screen bg-[#121212] flex items-center justify-center px-6">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(key.trim()); }} className="w-full max-w-sm bg-[#FDFBF7] rounded-3xl p-10">
        <Lock size={28} strokeWidth={1.2} className="text-[#C5A059]" />
        <p className="font-display text-3xl mt-5 tracking-[0.2em]">EL AVANTGARDE</p>
        <p className="eyebrow mt-2">Admin · Leads</p>
        <label htmlFor="admin-key" className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500 font-semibold mt-10 mb-2">Admin Key</label>
        <input id="admin-key" data-testid="admin-key-input" type="password" value={key} onChange={(e) => setKey(e.target.value)} autoFocus
          className="w-full bg-transparent border-0 border-b border-black/15 py-3 focus:outline-none focus:border-[#C5A059]" />
        {error && <p data-testid="admin-login-error" className="text-xs text-red-700 mt-2">{error}</p>}
        <button data-testid="admin-login-btn" disabled={!key.trim() || loading} className="mt-8 w-full btn-dark rounded-full py-3.5 text-[11px] tracking-[0.18em] uppercase font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50">
          {loading && <Loader2 size={14} className="animate-spin" />}Enter
        </button>
      </form>
    </main>
  );
};

export default function AdminLeads() {
  const [key, setKey] = useState(() => sessionStorage.getItem(KEY) || "");
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [unit, setUnit] = useState("all");

  const load = async (k) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API}/leads`, { headers: { "X-Admin-Key": k } });
      sessionStorage.setItem(KEY, k);
      setKey(k);
      setLeads(data);
    } catch (e) {
      if (e.response?.status === 401) {
        sessionStorage.removeItem(KEY);
        setLeads(null);
        setError("Invalid admin key.");
      } else if (leads) {
        toast.error("Could not refresh leads. Please try again.");
      } else {
        setError("Could not load leads. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) load(key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const units = useMemo(() => [...new Set((leads || []).map((l) => l.unit_type))], [leads]);
  const filtered = useMemo(() => (leads || []).filter((l) =>
    (unit === "all" || l.unit_type === unit) &&
    (`${l.full_name} ${l.whatsapp} ${l.budget}`.toLowerCase().includes(q.toLowerCase()) ||
      (q.replace(/\D/g, "") && l.whatsapp.replace(/\D/g, "").includes(q.replace(/\D/g, ""))))), [leads, q, unit]);

  if (!leads) return <Login onSubmit={load} error={error} loading={loading} />;

  const logout = () => { sessionStorage.removeItem(KEY); setKey(""); setLeads(null); };
  const weekCount = leads.filter((l) => Date.now() - new Date(l.created_at) < 7 * 864e5).length;

  return (
    <main data-testid="admin-page" className="min-h-screen bg-[#F4EFEA]">
      <header className="bg-[#121212] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl tracking-[0.24em]">EL AVANTGARDE</Link>
          <button data-testid="admin-logout-btn" onClick={logout} className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-[#C5A059]"><LogOut size={14} />Logout</button>
        </div>
      </header>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow"><span className="gold-line" />Admin</p>
            <h1 className="font-display font-light text-4xl sm:text-5xl mt-3">Private Tour Reservations</h1>
          </div>
          <div className="flex gap-3">
            <button data-testid="admin-refresh-btn" onClick={() => load(key)} disabled={loading} className="rounded-full border border-black/15 px-5 py-3 text-[11px] tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 hover:border-[#C5A059]">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh
            </button>
            <button data-testid="admin-export-btn" onClick={() => exportCsv(filtered)} disabled={!filtered.length} className="btn-gold rounded-full px-6 py-3 text-[11px] tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 disabled:opacity-50">
              <Download size={14} />Export CSV ({filtered.length})
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["Total leads", leads.length, "total"], ["Last 7 days", weekCount, "week"], ["Showing", filtered.length, "showing"], ["Top unit", [...units].sort((a, b) => leads.filter((l) => l.unit_type === b).length - leads.filter((l) => l.unit_type === a).length)[0] || "—", "top"]].map(([l, v, id]) => (
            <div key={id} data-testid={`admin-stat-${id}`} className="bg-white rounded-2xl p-6"><p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">{l}</p><p className="font-display text-3xl mt-2">{v}</p></div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input data-testid="admin-search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, WhatsApp, budget…" className="w-full bg-white rounded-full pl-11 pr-5 py-3 text-sm border border-black/5 focus:outline-none focus:border-[#C5A059]" />
          </div>
          <select data-testid="admin-unit-filter" value={unit} onChange={(e) => setUnit(e.target.value)} className="bg-white rounded-full px-5 py-3 text-sm border border-black/5 focus:outline-none focus:border-[#C5A059]">
            <option value="all">All unit types</option>
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="mt-6 bg-white rounded-2xl overflow-x-auto">
          <Table data-testid="admin-leads-table">
            <TableHeader><TableRow>{COLS.map(([k, l]) => <TableHead key={k} className="text-[10px] tracking-[0.16em] uppercase whitespace-nowrap">{l}</TableHead>)}</TableRow></TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} data-testid={`admin-lead-row-${l.id}`}>
                  {COLS.map(([k]) => (
                    <TableCell key={k} className="whitespace-nowrap text-sm">
                      {k === "whatsapp" ? <a href={`https://wa.me/${waNumber(l.whatsapp)}`} target="_blank" rel="noreferrer" className="text-[#B38F46] hover:underline">{l.whatsapp}</a> : cell(l, k)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!filtered.length && <p data-testid="admin-empty" className="p-10 text-center text-neutral-500">No reservations found.</p>}
        </div>
      </section>
    </main>
  );
}
