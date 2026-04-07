import { useState } from "react";

/* ── SVG Icons ── */
const IcUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcMonitor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IcCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcHeart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IcBrain = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IcBone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>
  </svg>
);
const IcWind = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
  </svg>
);
const IcEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcPhone = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IcMore = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
  </svg>
);
const IcSearch = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcChevD = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcChevL = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IcChevR = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const deptIcon = { Cardiology: IcHeart, Neurology: IcBrain, Orthopedics: IcBone, Pulmonology: IcWind, Ophthalmology: IcEye };

const departments = [
  { name:"Cardiology",    dr:"Dr. Sarah Johnson",   q:12, w:"22m" },
  { name:"Neurology",     dr:"Dr. Michael Chen",    q:8,  w:"15m" },
  { name:"Orthopedics",   dr:"Dr. Emily Davis",     q:6,  w:"12m" },
  { name:"Pulmonology",   dr:"Dr. Robert Martinez", q:5,  w:"10m" },
  { name:"Ophthalmology", dr:"Dr. Lisa Anderson",   q:3,  w:"8m"  },
];

const serving = [
  { token:"A-042", counter:3, dept:"Cardiology" },
  { token:"B-028", counter:5, dept:"Neurology" },
  { token:"C-015", counter:7, dept:"Orthopedics" },
];

const nextQ = [
  { token:"A-043", dept:"Cardiology" },
  { token:"B-029", dept:"Neurology" },
  { token:"C-016", dept:"Orthopedics" },
];

const patients = [
  { token:"A-044", name:"John Anderson",  id:"ID: P-10234", dept:"Cardiology",  dr:"Dr. Sarah Johnson",   ci:"09:45 AM", wt:"18 min",  pr:"Normal", st:"Waiting"     },
  { token:"B-030", name:"Maria Garcia",   id:"ID: P-10235", dept:"Neurology",   dr:"Dr. Michael Chen",    ci:"09:52 AM", wt:"11 min",  pr:"Urgent", st:"Waiting"     },
  { token:"C-017", name:"David Wilson",   id:"ID: P-10236", dept:"Orthopedics", dr:"Dr. Emily Davis",     ci:"10:05 AM", wt:"-2 min",  pr:"Normal", st:"In Progress" },
  { token:"A-045", name:"Sarah Thompson", id:"ID: P-10237", dept:"Cardiology",  dr:"Dr. Sarah Johnson",   ci:"10:15 AM", wt:"-12 min", pr:"Normal", st:"Waiting"     },
  { token:"D-012", name:"James Brown",    id:"ID: P-10238", dept:"Pulmonology", dr:"Dr. Robert Martinez", ci:"10:22 AM", wt:"-19 min", pr:"Normal", st:"Waiting"     },
];

const avatarBg = ["#dbeafe","#fef9c3","#dcfce7","#fce7f3","#ede9fe"];
const avatarFg = ["#1e40af","#854d0e","#166534","#9d174d","#5b21b6"];
const inits = n => n.split(" ").map(w => w[0]).join("").slice(0,2);

export default function Dashboard() {
  const [search, setSearch]     = useState("");
  const [deptF,  setDeptF]      = useState("All Departments");
  const [statF,  setStatF]      = useState("All Status");
  const [page,   setPage]       = useState(1);

  const rows = patients.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.token.toLowerCase().includes(search.toLowerCase())) &&
    (deptF === "All Departments" || p.dept === deptF) &&
    (statF === "All Status"      || p.st   === statF)
  );

  /* ── shared box style ── */
  const box = "border border-gray-200 rounded-lg bg-white";

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily:"'Inter',-apple-system,sans-serif", fontSize:13, color:"#111" }}>

      {/* ══ HEADER ══ */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-start justify-between flex-wrap gap-2">
        <div>
          <div style={{ fontSize:17, fontWeight:700 }}>Queue Management</div>
          <div style={{ fontSize:11, color:"#888", marginTop:1 }}>Real-time patient queue monitoring and management</div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1.5 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
            <IcDownload /> Export
          </button>
          <button className="flex items-center gap-1 rounded px-3 py-1.5 text-xs font-medium text-white" style={{ background:"#111" }}>
            <IcPlus /> Add Patient
          </button>
        </div>
      </div>

      <div className="px-6 py-4" style={{ maxWidth:"100%" }}>

        {/* ══ STAT CARDS ══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { label:"Total Patients", val:127, sub:"+12% vs yesterday",   badge:"Today",  Ic:IcUsers   },
            { label:"In Queue",       val:34,  sub:"18 min avg wait time", badge:"Live",   Ic:IcClock,  live:true },
            { label:"Being Served",   val:23,  sub:"8 rooms occupied",     badge:"Active", Ic:IcMonitor },
            { label:"Completed",      val:70,  sub:"92% satisfaction",     badge:"Today",  Ic:IcCheck   },
          ].map(({ label, val, sub, badge, Ic: icon, live }) => (
            <div key={label} className={`${box} p-3`}>
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-500">{icon()}</div>
                <span style={{
                  fontSize:10, fontWeight:600, padding:"1px 7px", borderRadius:20,
                  background: live ? "#fff1f1" : badge==="Active" ? "#f0fdf4" : "#f8f8f8",
                  color:       live ? "#e53e3e" : badge==="Active" ? "#16a34a" : "#888",
                  display:"flex", alignItems:"center", gap:3
                }}>
                  {live && <span style={{ width:5, height:5, borderRadius:"50%", background:"#e53e3e", display:"inline-block" }} />}
                  {badge}
                </span>
              </div>
              <div style={{ fontSize:26, fontWeight:700, lineHeight:1 }}>{val}</div>
              <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{label}</div>
              <div style={{ fontSize:10, color: sub.startsWith("+")?"#16a34a":"#aaa", marginTop:5 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ══ DEPT QUEUES + NOW SERVING ══ */}
        <div className="grid gap-3 mb-4" style={{ gridTemplateColumns:"1fr 0.6fr" }}>

          {/* Department Queues */}
          <div className={box}>
            <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-100">
              <span style={{ fontSize:13, fontWeight:600 }}>Department Queues</span>
              <button style={{ fontSize:11, color:"#888", background:"none", border:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {departments.map(({ name, dr, q, w }, i) => {
              const Ic = deptIcon[name];
              return (
                <div key={name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i<4 ? "1px solid #f5f5f5" : "none" }}>
                  <div style={{ width:30, height:30, borderRadius:6, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", color:"#555", flexShrink:0 }}>
                    <Ic />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600 }}>{name}</div>
                    <div style={{ fontSize:10, color:"#aaa" }}>{dr}</div>
                  </div>
                  <div style={{ textAlign:"right", marginRight:10, flexShrink:0 }}>
                    <div style={{ fontSize:12, fontWeight:600 }}>{q} <span style={{ fontSize:10, fontWeight:400, color:"#aaa" }}>in queue</span></div>
                    <div style={{ fontSize:10, color:"#aaa" }}>{w} wait time</div>
                  </div>
                  <button style={{ fontSize:11, padding:"3px 10px", border:"1px solid #ddd", borderRadius:4, background:"#fff", color:"#444", cursor:"pointer", flexShrink:0 }}>
                    Manage
                  </button>
                </div>
              );
            })}
          </div>

          {/* Now Serving */}
          <div className={box}>
            <div className="px-4 py-2.5 border-b border-gray-100">
              <span style={{ fontSize:13, fontWeight:600 }}>Now Serving</span>
            </div>
            <div className="p-3 space-y-2">
              {serving.map(({ token, counter, dept }) => (
                <div key={token} style={{ border:"1px solid #e5e7eb", borderRadius:6, padding:"10px 12px" }}>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize:18, fontWeight:700, letterSpacing:"-0.5px" }}>{token}</span>
                    <span style={{ fontSize:10, fontWeight:700, background:"#111", color:"#fff", padding:"2px 8px", borderRadius:3 }}>Active</span>
                  </div>
                  <div style={{ fontSize:10, color:"#aaa", marginTop:4 }}>Counter {counter}</div>
                  <div style={{ fontSize:11, color:"#555" }}>{dept}</div>
                </div>
              ))}
              <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:10, marginTop:4 }}>
                <div style={{ fontSize:10, fontWeight:600, color:"#aaa", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.05em" }}>Next in Queue</div>
                {nextQ.map(({ token, dept }) => (
                  <div key={token} className="flex justify-between" style={{ marginBottom:5 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#333" }}>{token}</span>
                    <span style={{ fontSize:11, color:"#aaa" }}>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ PATIENT QUEUE ══ */}
        <div className={box}>
          {/* toolbar */}
          <div className="flex flex-wrap justify-between items-center px-4 py-2.5 border-b border-gray-100 gap-2">
            <span style={{ fontSize:13, fontWeight:600 }}>Patient Queue</span>
            <div className="flex flex-wrap gap-2 items-center">
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <span style={{ position:"absolute", left:8, display:"flex" }}><IcSearch /></span>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search patients..."
                  style={{ paddingLeft:26, paddingRight:8, paddingTop:5, paddingBottom:5, border:"1px solid #e5e7eb", borderRadius:5, fontSize:11, outline:"none", width:160, color:"#333", fontFamily:"inherit" }}
                />
              </div>
              {/* dept */}
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <select value={deptF} onChange={e=>setDeptF(e.target.value)}
                  style={{ appearance:"none", padding:"5px 22px 5px 8px", border:"1px solid #e5e7eb", borderRadius:5, fontSize:11, color:"#333", background:"#fff", cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                  <option>All Departments</option>
                  {departments.map(d=><option key={d.name}>{d.name}</option>)}
                </select>
                <span style={{ position:"absolute", right:6, pointerEvents:"none", display:"flex" }}><IcChevD /></span>
              </div>
              {/* status */}
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <select value={statF} onChange={e=>setStatF(e.target.value)}
                  style={{ appearance:"none", padding:"5px 22px 5px 8px", border:"1px solid #e5e7eb", borderRadius:5, fontSize:11, color:"#333", background:"#fff", cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                  <option>All Status</option>
                  <option>Waiting</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <span style={{ position:"absolute", right:6, pointerEvents:"none", display:"flex" }}><IcChevD /></span>
              </div>
            </div>
          </div>

          {/* table */}
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#fafafa", borderBottom:"1px solid #f0f0f0" }}>
                  {["TOKEN","PATIENT","DEPARTMENT","CHECK-IN TIME","WAIT TIME","PRIORITY","STATUS","ACTIONS"].map(h => (
                    <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:10, fontWeight:600, color:"#888", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p, i) => {
                  const ci = i % avatarBg.length;
                  const stStyle =
                    p.st === "Waiting"     ? { bg:"#f8f8f8", tx:"#555"    } :
                    p.st === "In Progress" ? { bg:"#eff6ff", tx:"#2563eb" } :
                                             { bg:"#f0fdf4", tx:"#16a34a" };
                  return (
                    <tr key={p.token} style={{ borderBottom:"1px solid #f5f5f5" }}>
                      <td style={{ padding:"10px 12px", fontWeight:600, fontSize:12 }}>{p.token}</td>
                      <td style={{ padding:"10px 12px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:28, height:28, borderRadius:"50%", background:avatarBg[ci], color:avatarFg[ci], display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>
                            {inits(p.name)}
                          </div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>{p.name}</div>
                            <div style={{ fontSize:10, color:"#aaa" }}>{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:"10px 12px" }}>
                        <div style={{ fontSize:12, fontWeight:500, whiteSpace:"nowrap" }}>{p.dept}</div>
                        <div style={{ fontSize:10, color:"#aaa" }}>{p.dr}</div>
                      </td>
                      <td style={{ padding:"10px 12px", fontSize:12, color:"#444", whiteSpace:"nowrap" }}>{p.ci}</td>
                      <td style={{ padding:"10px 12px", fontSize:12, fontWeight:600, whiteSpace:"nowrap", color: p.wt.startsWith("-")?"#ef4444":"#333" }}>{p.wt}</td>
                      <td style={{ padding:"10px 12px" }}>
                        <span style={{ fontSize:10, fontWeight:600, padding:"2px 9px", borderRadius:20, background: p.pr==="Urgent"?"#ef4444":"#f3f4f6", color: p.pr==="Urgent"?"#fff":"#555" }}>{p.pr}</span>
                      </td>
                      <td style={{ padding:"10px 12px" }}>
                        <span style={{ fontSize:10, fontWeight:600, padding:"2px 9px", borderRadius:20, background:stStyle.bg, color:stStyle.tx }}>{p.st}</span>
                      </td>
                      <td style={{ padding:"10px 12px" }}>
                        <div style={{ display:"flex", gap:4 }}>
                          <button style={{ padding:5, border:"1px solid #e5e7eb", borderRadius:4, background:"#fff", cursor:"pointer", display:"flex", color:"#555" }}><IcPhone /></button>
                          <button style={{ padding:5, border:"1px solid #e5e7eb", borderRadius:4, background:"#fff", cursor:"pointer", display:"flex", color:"#555" }}><IcMore /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex justify-between items-center px-4 py-2.5 border-t border-gray-100 flex-wrap gap-2">
            <span style={{ fontSize:11, color:"#888" }}>Showing 1-{rows.length} of 34 patients</span>
            <div style={{ display:"flex", gap:3 }}>
              <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:26, height:26, border:"1px solid #e5e7eb", borderRadius:4, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><IcChevL /></button>
              {[1,2,3].map(n=>(
                <button key={n} onClick={()=>setPage(n)} style={{ width:26, height:26, border:`1px solid ${page===n?"#111":"#e5e7eb"}`, borderRadius:4, background:page===n?"#111":"#fff", color:page===n?"#fff":"#333", cursor:"pointer", fontSize:12, fontWeight:page===n?600:400 }}>{n}</button>
              ))}
              <button onClick={()=>setPage(Math.min(3,page+1))} style={{ width:26, height:26, border:"1px solid #e5e7eb", borderRadius:4, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><IcChevR /></button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          [style*="gridTemplateColumns: 1fr 0.6fr"]{grid-template-columns:1fr !important;}
          .grid-cols-4{grid-template-columns:repeat(2,1fr) !important;}
        }
      `}</style>
    </div>
  );
}