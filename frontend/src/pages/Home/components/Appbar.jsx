function Appbar({ onLogout }) {
  return (
    <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 18px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:34, height:34, background:"linear-gradient(135deg,var(--brand),var(--brand-dark))", borderRadius:9, display:"grid", placeItems:"center", fontSize:17 }}>🎯</div>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"1.1rem", fontWeight:800, background:"linear-gradient(135deg,var(--brand),var(--orange))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>InterviewAI</span>
      </div>
      <button onClick={onLogout} style={{ padding:"7px 15px", background:"var(--surface2)", border:"1.5px solid var(--border2)", borderRadius:"var(--r)", fontSize:".81rem", fontWeight:600, cursor:"pointer" }}>Logout</button>
    </header>
  );
}
export default Appbar;
