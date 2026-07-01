import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import content from "../../content/admin.json";
import "./AdminDashboardPage.css";

const TABS = ["overview", "users", "interviews", "ppdt"];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const c = content.dashboard;
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [ppdtRecords, setPpdtRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users?limit=50");
    setUsers(res.data.users);
  };

  const fetchInterviews = async () => {
    const res = await api.get("/admin/interview-records?limit=50");
    setInterviews(res.data.records);
  };

  const fetchPPDT = async () => {
    const res = await api.get("/admin/ppdt-records?limit=50");
    setPpdtRecords(res.data.records);
  };

  useEffect(() => {
    setLoading(true);
    const loadAll = async () => {
      try {
        await fetchStats();
        if (activeTab === "users") await fetchUsers();
        if (activeTab === "interviews") await fetchInterviews();
        if (activeTab === "ppdt") await fetchPPDT();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("iq_token");
    navigate("/admin/login");
  };

  return (
    <div className="page-wrapper">
      {/* Admin navbar */}
      <div className="admin-navbar">
        <div className="container admin-navbar-inner">
          <div className="flex items-center gap-12">
            <div className="admin-logo-icon">IQ</div>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>InterviewIQ</span>
              <span className="badge badge-secondary" style={{ marginLeft: 10, fontSize: "0.7rem" }}>Admin</span>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>{c.logout}</button>
        </div>
      </div>

      <div className="container admin-container">
        <div className="flex items-center justify-between mb-24">
          <h1 className="display-heading">{c.heading}</h1>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`admin-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {c.tabs[tab]}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <div className="spinner" style={{ margin: "0 auto" }} />
          </div>
        )}

        {!loading && activeTab === "overview" && stats && (
          <div>
            <div className="admin-stats-grid">
              {[
                { label: c.stats.totalUsers, value: stats.totalUsers },
                { label: c.stats.totalInterviews, value: stats.totalInterviews },
                { label: c.stats.totalPPDT, value: stats.totalPPDT },
                { label: c.stats.avgScore, value: stats.avgInterviewScore ? `${stats.avgInterviewScore}/10` : "—" },
                { label: c.stats.recentSignups, value: stats.recentSignups },
              ].map((s) => (
                <div key={s.label} className="admin-stat-card card">
                  <div className="admin-stat-value">{s.value}</div>
                  <div className="admin-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && activeTab === "users" && (
          <div className="card" style={{ padding: 0 }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {c.tables.users.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--color-text-muted)", padding: 32 }}>{c.emptyState}</td></tr>
                  ) : users.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{u.fullName}</div>
                      </td>
                      <td style={{ color: "var(--color-text-secondary)" }}>{u.email}</td>
                      <td>
                        <span className={`badge ${u.role === "admin" ? "badge-secondary" : "badge-muted"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.stats?.totalInterviews ?? 0}</td>
                      <td>{u.stats?.averageInterviewScore ? `${u.stats.averageInterviewScore}/10` : "—"}</td>
                      <td style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem" }}>
                        {new Date(u.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === "interviews" && (
          <div className="card" style={{ padding: 0 }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {c.tables.interviews.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {interviews.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--color-text-muted)", padding: 32 }}>{c.emptyState}</td></tr>
                  ) : interviews.map((r) => (
                    <tr key={r._id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{r.userId?.fullName || "—"}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{r.userId?.email}</div>
                      </td>
                      <td>{r.targetRole || "—"}</td>
                      <td><span className="badge badge-muted">{r.interviewType}</span></td>
                      <td>{r.difficulty || "—"}</td>
                      <td style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                        {r.overallScore ? `${r.overallScore}/10` : "—"}
                      </td>
                      <td style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem" }}>
                        {new Date(r.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === "ppdt" && (
          <div className="card" style={{ padding: 0 }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {c.tables.ppdt.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ppdtRecords.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--color-text-muted)", padding: 32 }}>{c.emptyState}</td></tr>
                  ) : ppdtRecords.map((r) => (
                    <tr key={r._id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{r.userId?.fullName || "—"}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{r.userId?.email}</div>
                      </td>
                      <td style={{ color: "var(--color-text-secondary)" }}>{r.imageId}</td>
                      <td><span className="badge badge-muted">{r.difficulty}</span></td>
                      <td style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                        {r.overallScore ? `${r.overallScore}/10` : "—"}
                      </td>
                      <td style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem" }}>
                        {new Date(r.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
