import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const statusConfig = {
  WAITING: {
    label: "Waiting",
    cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  IN_TREATMENT: {
    label: "In treatment",
    cls: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
};

const getPriority = (score) => {
  if (score >= 6) return { label: "Urgent", cls: "bg-red-600 text-white" };
  if (score >= 3) return { label: "Moderate", cls: "bg-orange-100 text-orange-700" };
  return { label: "Normal", cls: "bg-zinc-100 text-zinc-500" };
};

const fmt = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d) ? "—" : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Field = ({ label, value }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-zinc-100 last:border-0">
    <span className="text-xs text-zinc-400 shrink-0 mr-4">{label}</span>
    <span className="text-xs text-zinc-800 font-medium text-right">{value || "—"}</span>
  </div>
);

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white border border-zinc-100 rounded-2xl p-5 flex flex-col gap-1">
    <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">{label}</p>
    <p className="text-3xl font-bold text-zinc-900 leading-none mt-1">{value}</p>
    {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
  </div>
);

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [apiError, setApiError] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const [selected, setSelected] = useState(null);

  const fetchQueue = async (silent = false) => {
    if (!user?.user_id) return;
    silent ? setRefreshing(true) : setLoading(true);
    setApiError("");
    try {
      const res = await API.get(`/doctors/${user.user_id}/queue`);
      setQueue(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      const msg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Unable to fetch doctor queue";
      setApiError(typeof msg === "string" ? msg : "Unable to fetch doctor queue");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchQueue(); }, [user?.user_id]);

  const handleAction = async (patientId, action) => {
    setActionLoading((prev) => ({ ...prev, [patientId]: action }));
    setApiError("");
    try {
      await API.patch(`/doctors/treatment/${action}/${patientId}`);
      await fetchQueue(true);
    } catch (error) {
      const msg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Action failed";
      setApiError(typeof msg === "string" ? msg : "Action failed");
    } finally {
      setActionLoading((prev) => ({ ...prev, [patientId]: "" }));
    }
  };

  const filteredQueue = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return queue;
    return queue.filter((p) =>
      (p.name || "").toLowerCase().includes(term) ||
      String(p.token_number || "").includes(term) ||
      (p.contact_number || "").toLowerCase().includes(term)
    );
  }, [queue, search]);

  const stats = useMemo(() => {
    const waiting = queue.filter((p) => p.status === "WAITING").length;
    const inTx = queue.filter((p) => p.status === "IN_TREATMENT").length;
    const elderly = queue.filter((p) => (p.age || 0) >= 65).length;
    const avgPriority = queue.length
      ? Math.round(queue.reduce((a, p) => a + (p.priority_score || 0), 0) / queue.length)
      : 0;
    return { total: queue.length, waiting, inTx, elderly, avgPriority };
  }, [queue]);

  const nowServing = queue.find((p) => p.status === "IN_TREATMENT") || null;
  const nextInQueue = queue
    .filter((p) => p.status === "WAITING")
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Command Desk</h1>
            <p className="text-sm text-zinc-400 mt-0.5">Real-time patient queue · Dr. {user?.name || "—"}</p>
          </div>
          <button
            onClick={() => fetchQueue(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 8a7 7 0 1 0 7-7" />
              <polyline points="1 1 1 8 8 8" />
            </svg>
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Error */}
        {apiError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 10.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm.75-3.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v3z" />
            </svg>
            {apiError}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total assigned" value={stats.total} />
          <StatCard label="Waiting" value={stats.waiting} />
          <StatCard label="Avg priority" value={stats.avgPriority} />
          <StatCard label="Senior (65+)" value={stats.elderly} />
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Now Serving */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">Now serving</p>
            </div>

            {nowServing ? (
              <>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-zinc-900">#{nowServing.token_number || "—"}</span>
                </div>
                <p className="text-base font-semibold text-zinc-900">{nowServing.name}</p>
                <p className="text-xs text-zinc-400 mb-4">Checked in at {fmt(nowServing.created_at)}</p>

                <div className="flex-1 space-y-0">
                  <Field label="Age / Gender" value={`${nowServing.age || "—"} / ${nowServing.gender || "—"}`} />
                  <Field label="Contact" value={nowServing.contact_number} />
                  <Field label="Address" value={nowServing.address} />
                  <Field label="Symptoms" value={nowServing.symptoms} />
                  <Field label="BP" value={nowServing.blood_pressure} />
                  <Field label="Heart rate" value={nowServing.heart_rate} />
                  <Field label="SpO2" value={nowServing.oxygen_lvl} />
                  <Field label="Temperature" value={nowServing.body_temperature} />
                  <Field label="Disability" value={nowServing.physical_disability ? "Yes" : "No"} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {(() => { const p = getPriority(nowServing.priority_score || 0); return (
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${p.cls}`}>
                      {p.label} · {nowServing.priority_score || 0}
                    </span>
                  ); })()}
                </div>

                <button
                  onClick={() => handleAction(nowServing.patient_id, "complete")}
                  disabled={actionLoading[nowServing.patient_id] === "complete"}
                  className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  {actionLoading[nowServing.patient_id] === "complete" ? "Completing…" : "Mark as completed"}
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-zinc-400">No patient in treatment</p>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Next in queue */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-6">
              <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mb-4">Next in queue</p>
              {nextInQueue.length === 0 ? (
                <p className="text-sm text-zinc-400">No patients waiting.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nextInQueue.map((p, i) => {
                    const pb = getPriority(p.priority_score || 0);
                    return (
                      <div
                        key={p.patient_id}
                        className="flex items-center gap-3 border border-zinc-100 rounded-xl px-4 py-3 hover:bg-zinc-50 transition-colors cursor-default"
                      >
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 truncate">
                            #{p.token_number} · {p.name}
                          </p>
                          <p className="text-xs text-zinc-400">{fmt(p.created_at)}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${pb.cls}`}>
                          {pb.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Queue table */}
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden flex-1">
              <div className="px-6 py-4 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">Full queue</p>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6.5" cy="6.5" r="5" /><path d="m11 11 3 3" />
                  </svg>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, token, phone…"
                    className="pl-8 pr-4 py-2 text-sm border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 bg-zinc-50 w-64"
                  />
                </div>
              </div>

              {loading ? (
                <div className="px-6 py-12 text-sm text-zinc-400 text-center">Loading queue…</div>
              ) : filteredQueue.length === 0 ? (
                <div className="px-6 py-12 text-sm text-zinc-400 text-center">No patients found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        {["Token", "Patient", "Age", "Contact", "Check-in", "Priority", "Status", ""].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] text-zinc-400 font-semibold uppercase tracking-wider bg-zinc-50/60">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQueue.map((p) => {
                        const pb = getPriority(p.priority_score || 0);
                        const sc = statusConfig[p.status] || { label: p.status, cls: "bg-zinc-100 text-zinc-500" };
                        const loading = actionLoading[p.patient_id];
                        const canCall = p.status === "WAITING";
                        return (
                          <tr
                            key={p.patient_id}
                            className="border-b border-zinc-50 hover:bg-zinc-50/60 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <span className="text-sm font-bold text-zinc-900">#{p.token_number || "—"}</span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-semibold text-zinc-900">{p.name}</p>
                              <p className="text-[11px] text-zinc-400">ID {p.patient_id}</p>
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-600">{p.age || "—"}</td>
                            <td className="px-4 py-3 text-sm text-zinc-600">{p.contact_number || "—"}</td>
                            <td className="px-4 py-3 text-sm text-zinc-600">{fmt(p.created_at)}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${pb.cls}`}>
                                {pb.label} · {p.priority_score || 0}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.cls}`}>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleAction(p.patient_id, "start")}
                                disabled={!!loading || !canCall}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-30 transition-colors"
                              >
                                {loading === "start" ? "Calling…" : "Call in"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}