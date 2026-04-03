import { useState } from "react";

/* ── Inline SVG Icons ── */
const Users = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Clock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Monitor = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const CheckCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const Heart = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const Brain = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const Bone = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>;
const Wind = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>;
const Eye = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const Download = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Phone = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MoreH = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>;
const SearchIco = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ChevL = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevR = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const ChevD = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;

const deptIcons = { Cardiology: Heart, Neurology: Brain, Orthopedics: Bone, Pulmonology: Wind, Ophthalmology: Eye };

const departments = [
  { name: "Cardiology",    doctor: "Dr. Sarah Johnson",   queue: 12, wait: "22m" },
  { name: "Neurology",     doctor: "Dr. Michael Chen",    queue: 8,  wait: "15m" },
  { name: "Orthopedics",   doctor: "Dr. Emily Davis",     queue: 6,  wait: "12m" },
  { name: "Pulmonology",   doctor: "Dr. Robert Martinez", queue: 5,  wait: "10m" },
  { name: "Ophthalmology", doctor: "Dr. Lisa Anderson",   queue: 3,  wait: "8m"  },
];

const nowServing = [
  { token: "A-042", counter: 3, dept: "Cardiology" },
  { token: "B-028", counter: 5, dept: "Neurology" },
  { token: "C-015", counter: 7, dept: "Orthopedics" },
];

const nextQueue = [
  { token: "A-043", dept: "Cardiology" },
  { token: "B-029", dept: "Neurology" },
  { token: "C-016", dept: "Orthopedics" },
];

const patients = [
  { token:"A-044", name:"John Anderson",  pid:"ID: P-10234", dept:"Cardiology",   doctor:"Dr. Sarah Johnson",   checkIn:"09:45 AM", wait:"18 min",  priority:"Normal", status:"Waiting"     },
  { token:"B-030", name:"Maria Garcia",   pid:"ID: P-10235", dept:"Neurology",    doctor:"Dr. Michael Chen",    checkIn:"09:52 AM", wait:"11 min",  priority:"Urgent", status:"Waiting"     },
  { token:"C-017", name:"David Wilson",   pid:"ID: P-10236", dept:"Orthopedics",  doctor:"Dr. Emily Davis",     checkIn:"10:05 AM", wait:"-2 min",  priority:"Normal", status:"In Progress" },
  { token:"A-045", name:"Sarah Thompson", pid:"ID: P-10237", dept:"Cardiology",   doctor:"Dr. Sarah Johnson",   checkIn:"10:15 AM", wait:"-12 min", priority:"Normal", status:"Waiting"     },
  { token:"D-012", name:"James Brown",    pid:"ID: P-10238", dept:"Pulmonology",  doctor:"Dr. Robert Martinez", checkIn:"10:22 AM", wait:"-19 min", priority:"Normal", status:"Waiting"     },
];

const aColors = ["#e8f4fd","#fef3c7","#f0fdf4","#fce7f3","#ede9fe"];
const aText   = ["#1d6fa4","#92400e","#166534","#9d174d","#5b21b6"];
const initials = n => n.split(" ").map(w=>w[0]).join("").slice(0,2);

const card = { background:"#fff", border:"1px solid #e5e7eb", borderRadius:10 };

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [deptF, setDeptF] = useState("All Departments");
  const [statF, setStatF] = useState("All Status");
  const [page, setPage] = useState(1);

  const rows = patients.filter(p => {
    const s = p.name.toLowerCase().includes(search.toLowerCase()) || p.token.toLowerCase().includes(search.toLowerCase());
    const d = deptF === "All Departments" || p.dept === deptF;
    const st = statF === "All Status" || p.status === statF;
    return s && d && st;
  });

  const S = {
    page: { fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", fontSize:13, background:"#f3f4f6", minHeight:"100vh", color:"#111827" },
    topbar: { background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"14px 24px" },
    tbInner: { maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10 },
    h1: { fontSize:18, fontWeight:700, color:"#111827", margin:0 },
    sub: { fontSize:12, color:"#6b7280", marginTop:3 },
    btnGhost: { display:"flex", alignItems:"center", gap:5, padding:"7px 13px", border:"1px solid #d1d5db", borderRadius:6, background:"#fff", fontSize:13, color:"#374151", cursor:"pointer", fontWeight:500 },
    btnDark: { display:"flex", alignItems:"center", gap:5, padding:"7px 13px", border:"none", borderRadius:6, background:"#111827", fontSize:13, color:"#fff", cursor:"pointer", fontWeight:500 },
    main: { maxWidth:1400, margin:"0 auto", padding:"18px 24px" },
    sectionTitle: { fontSize:14, fontWeight:600, color:"#111827" },
    th: { padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", letterSpacing:"0.05em", whiteSpace:"nowrap", background:"#f9fafb" },
    td: { padding:"11px 14px", borderBottom:"1px solid #f3f4f6" },
  };

  return (
    <div style={S.page}>
      {/* Topbar */}
      <div style={S.topbar}>
        <div style={S.tbInner}>
          <div>
            <div style={S.h1}>Queue Management</div>
            <div style={S.sub}>Real-time patient queue monitoring and management</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={S.btnGhost}><Download /> Export</button>
            <button style={S.btnDark}><Plus /> Add Patient</button>
          </div>
        </div>
      </div>

      <div style={S.main}>

        {/* ── Stat Cards ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12, marginBottom:18 }}>
          {[
            { label:"Total Patients", value:127, sub:"+12% vs yesterday",  badge:"Today",  Ic:Users,       ibg:"#eff6ff", ic:"#3b82f6" },
            { label:"In Queue",       value:34,  sub:"18 min avg wait time",badge:"Live",   Ic:Clock,       ibg:"#fff7ed", ic:"#f97316", live:true },
            { label:"Being Served",   value:23,  sub:"8 rooms occupied",    badge:"Active", Ic:Monitor,     ibg:"#f0fdf4", ic:"#22c55e" },
            { label:"Completed",      value:70,  sub:"92% satisfaction",    badge:"Today",  Ic:CheckCircle, ibg:"#f0f9ff", ic:"#0ea5e9" },
          ].map(({ label, value, sub, badge, Ic, ibg, ic, live }) => (
            <div key={label} style={{ ...card, padding:"15px 17px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div style={{ background:ibg, borderRadius:8, padding:8, color:ic, display:"flex" }}><Ic /></div>
                <span style={{
                  fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:20, display:"flex", alignItems:"center", gap:4,
                  background: live?"#fef2f2": badge==="Active"?"#f0fdf4":"#f9fafb",
                  color: live?"#ef4444": badge==="Active"?"#16a34a":"#6b7280"
                }}>
                  {live && <span style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", display:"inline-block", animation:"pulse 1.5s infinite" }}/>}
                  {badge}
                </span>
              </div>
              <div style={{ fontSize:28, fontWeight:700, lineHeight:1, color:"#111827" }}>{value}</div>
              <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>{label}</div>
              <div style={{ fontSize:11, color: sub.startsWith("+")?"#16a34a":"#9ca3af", marginTop:7 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ── Middle row ── */}
        <div className="mid-row" style={{ display:"grid", gridTemplateColumns:"1.65fr 1fr", gap:12, marginBottom:18 }}>

          {/* Dept Queues */}
          <div style={card}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 17px", borderBottom:"1px solid #f3f4f6" }}>
              <span style={S.sectionTitle}>Department Queues</span>
              <button style={{ fontSize:12, color:"#6b7280", background:"none", border:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {departments.map(({ name, doctor, queue, wait }, i) => {
              const Ic = deptIcons[name];
              return (
                <div key={name} style={{ display:"flex", alignItems:"center", gap:11, padding:"10px 17px", borderBottom: i<4?"1px solid #f9fafb":"none" }}>
                  <div style={{ background:"#f3f4f6", borderRadius:7, padding:7, color:"#6b7280", display:"flex", flexShrink:0 }}><Ic /></div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"#111827" }}>{name}</div>
                    <div style={{ fontSize:11, color:"#9ca3af" }}>{doctor}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0, marginRight:6 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"#111827" }}>{queue} <span style={{ fontSize:11, fontWeight:400, color:"#9ca3af" }}>in queue</span></div>
                    <div style={{ fontSize:11, color:"#9ca3af" }}>{wait} wait time</div>
                  </div>
                  <button style={{ padding:"5px 11px", border:"1px solid #e5e7eb", borderRadius:6, background:"#fff", fontSize:12, color:"#374151", cursor:"pointer", fontWeight:500, flexShrink:0 }}>Manage</button>
                </div>
              );
            })}
          </div>

          {/* Now Serving */}
          <div style={card}>
            <div style={{ padding:"13px 17px", borderBottom:"1px solid #f3f4f6" }}>
              <span style={S.sectionTitle}>Now Serving</span>
            </div>
            <div style={{ padding:"14px 17px" }}>
              {nowServing.map(({ token, counter, dept }) => (
                <div key={token} style={{ border:"1px solid #e5e7eb", borderRadius:8, padding:"11px 13px", marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:20, fontWeight:800, color:"#111827", letterSpacing:"-0.5px" }}>{token}</span>
                    <span style={{ fontSize:10, fontWeight:700, background:"#111827", color:"#fff", padding:"2px 9px", borderRadius:4 }}>Active</span>
                  </div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginTop:5 }}>Counter {counter}</div>
                  <div style={{ fontSize:12, color:"#6b7280", fontWeight:500 }}>{dept}</div>
                </div>
              ))}
              <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:12 }}>
                <div style={{ fontSize:11, fontWeight:600, color:"#9ca3af", marginBottom:9, textTransform:"uppercase", letterSpacing:"0.05em" }}>Next in Queue</div>
                {nextQueue.map(({ token, dept }) => (
                  <div key={token} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#374151" }}>{token}</span>
                    <span style={{ fontSize:12, color:"#9ca3af" }}>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Patient Queue ── */}
        <div style={card}>
          {/* Toolbar */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", padding:"13px 17px", borderBottom:"1px solid #f3f4f6", gap:10 }}>
            <span style={S.sectionTitle}>Patient Queue</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <span style={{ position:"absolute", left:9, color:"#9ca3af", display:"flex" }}><SearchIco /></span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search patients..."
                  style={{ paddingLeft:28, paddingRight:9, paddingTop:6, paddingBottom:6, border:"1px solid #e5e7eb", borderRadius:6, fontSize:12, outline:"none", width:175, color:"#374151", fontFamily:"inherit" }}/>
              </div>
              {[["deptF", deptF, setDeptF, ["All Departments",...departments.map(d=>d.name)]],
                ["statF", statF, setStatF, ["All Status","Waiting","In Progress","Completed"]]
              ].map(([key, val, setter, opts]) => (
                <div key={key} style={{ position:"relative", display:"flex", alignItems:"center" }}>
                  <select value={val} onChange={e=>setter(e.target.value)}
                    style={{ appearance:"none", paddingLeft:9, paddingRight:24, paddingTop:6, paddingBottom:6, border:"1px solid #e5e7eb", borderRadius:6, fontSize:12, color:"#374151", background:"#fff", cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                  <span style={{ position:"absolute", right:7, color:"#9ca3af", pointerEvents:"none", display:"flex" }}><ChevD /></span>
                </div>
              ))}
            </div>
          </div>

          {/* Table – desktop */}
          <div className="tbl-wrap" style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  {["TOKEN","PATIENT","DEPARTMENT","CHECK-IN TIME","WAIT TIME","PRIORITY","STATUS","ACTIONS"].map(h=>(
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p, i) => {
                  const ci = i % aColors.length;
                  const sSt = p.status==="Waiting"?{bg:"#f9fafb",tx:"#6b7280"}: p.status==="In Progress"?{bg:"#eff6ff",tx:"#2563eb"}:{bg:"#f0fdf4",tx:"#16a34a"};
                  return (
                    <tr key={p.token} style={{ background:"#fff" }}>
                      <td style={S.td}><span style={{ fontWeight:600, fontSize:13 }}>{p.token}</span></td>
                      <td style={S.td}>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <div style={{ width:31, height:31, borderRadius:"50%", background:aColors[ci], color:aText[ci], display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{initials(p.name)}</div>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600, color:"#111827", whiteSpace:"nowrap" }}>{p.name}</div>
                            <div style={{ fontSize:11, color:"#9ca3af" }}>{p.pid}</div>
                          </div>
                        </div>
                      </td>
                      <td style={S.td}>
                        <div style={{ fontSize:13, fontWeight:500, color:"#111827", whiteSpace:"nowrap" }}>{p.dept}</div>
                        <div style={{ fontSize:11, color:"#9ca3af" }}>{p.doctor}</div>
                      </td>
                      <td style={{ ...S.td, fontSize:13, color:"#374151", whiteSpace:"nowrap" }}>{p.checkIn}</td>
                      <td style={{ ...S.td, fontSize:13, fontWeight:600, color:p.wait.startsWith("-")?"#ef4444":"#374151", whiteSpace:"nowrap" }}>{p.wait}</td>
                      <td style={S.td}>
                        <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:p.priority==="Urgent"?"#ef4444":"#f3f4f6", color:p.priority==="Urgent"?"#fff":"#6b7280" }}>{p.priority}</span>
                      </td>
                      <td style={S.td}>
                        <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:sSt.bg, color:sSt.tx }}>{p.status}</span>
                      </td>
                      <td style={S.td}>
                        <div style={{ display:"flex", gap:4 }}>
                          <button style={{ padding:5, border:"1px solid #e5e7eb", borderRadius:5, background:"#fff", cursor:"pointer", color:"#6b7280", display:"flex", alignItems:"center" }}><Phone /></button>
                          <button style={{ padding:5, border:"1px solid #e5e7eb", borderRadius:5, background:"#fff", cursor:"pointer", color:"#6b7280", display:"flex", alignItems:"center" }}><MoreH /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", padding:"11px 17px", borderTop:"1px solid #f3f4f6", gap:10 }}>
            <span style={{ fontSize:12, color:"#6b7280" }}>Showing 1-{rows.length} of 34 patients</span>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:27, height:27, border:"1px solid #e5e7eb", borderRadius:5, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b7280" }}><ChevL /></button>
              {[1,2,3].map(n=>(
                <button key={n} onClick={()=>setPage(n)} style={{ width:27, height:27, border:`1px solid ${page===n?"#111827":"#e5e7eb"}`, borderRadius:5, background:page===n?"#111827":"#fff", color:page===n?"#fff":"#374151", cursor:"pointer", fontSize:12, fontWeight:page===n?600:400 }}>{n}</button>
              ))}
              <button onClick={()=>setPage(Math.min(3,page+1))} style={{ width:27, height:27, border:"1px solid #e5e7eb", borderRadius:5, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b7280" }}><ChevR /></button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @media(max-width:900px){ .mid-row{ grid-template-columns:1fr !important; } }
        @media(max-width:600px){
          .tbl-wrap table thead{ display:none; }
          .tbl-wrap table tr{ display:block; margin:8px 0; border:1px solid #e5e7eb; border-radius:8px; }
          .tbl-wrap table td{ display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f3f4f6 !important; }
          .tbl-wrap table td:last-child{ border-bottom:none !important; }
        }
      `}</style>
    </div>
  );
}