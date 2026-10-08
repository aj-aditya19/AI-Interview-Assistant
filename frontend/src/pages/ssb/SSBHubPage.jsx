import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import api from "../../utils/api.js";
import { TEST_META } from "./ssbMeta.js";

const CARDS = [
  {
    key: "ppdt",
    icon: "🖼️",
    title: "PPDT",
    desc: "Picture Perception & Description: observe, narrate a story and discuss.",
    path: "/ppdt/setup",
  },
  {
    key: "tat",
    icon: "📖",
    title: "TAT",
    desc: TEST_META.tat.short,
    path: "/ssb/test/tat",
  },
  {
    key: "wat",
    icon: "⚡",
    title: "WAT",
    desc: TEST_META.wat.short,
    path: "/ssb/test/wat",
  },
  {
    key: "srt",
    icon: "🧭",
    title: "SRT",
    desc: TEST_META.srt.short,
    path: "/ssb/test/srt",
  },
  {
    key: "sdt",
    icon: "🪞",
    title: "SDT",
    desc: TEST_META.sdt.short,
    path: "/ssb/test/sdt",
  },
  {
    key: "gd",
    icon: "🗣️",
    title: "Group Discussion",
    desc: "Discuss a topic with 3 AI participants and get a leadership score.",
    path: "/ssb/gd",
  },
];

export default function SSBHubPage() {
  const navigate = useNavigate();
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    api
      .get("/practice/config")
      .then((r) => setCfg(r.data))
      .catch(() => {});
  }, []);

  const startBattery = () => {
    const plan = ["tat", "wat", "srt", "sdt"];
    sessionStorage.setItem("iq_ssb_plan", JSON.stringify(plan.slice(1)));
    sessionStorage.setItem("iq_ssb_scores", "{}");
    navigate(`/ssb/test/${plan[0]}`);
  };

  const tatLow = cfg && cfg.available.tat < 2;

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="ft-page">
        <h1 className="display-heading">PPDT Practice</h1>
        <p className="body-text mt-8">
          Psychology tests, group discussion and an Officer Like Qualities (OLQ)
          report that builds from everything you practise.
        </p>

        {tatLow && (
          <div className="alert alert-info mt-16">
            TAT needs more pictures. Add images to{" "}
            <code>backend/public/ppdt</code> (see the README) so you get a full
            set of slides.
          </div>
        )}

        <div className="ft-grid mt-24">
          {CARDS.map((c) => (
            <button
              key={c.key}
              className="ft-card"
              onClick={() => navigate(c.path)}
            >
              <span className="ft-card-icon" aria-hidden="true">
                {c.icon}
              </span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </button>
          ))}
        </div>

        <div className="ft-panel mt-24">
          <div className="ft-between">
            <div>
              <h2 className="section-heading">Psychology battery</h2>
              <p className="body-text mt-8">
                TAT → WAT → SRT → SDT back to back, with a combined score at the
                end (about 25 minutes).
              </p>
            </div>
            <button className="btn btn-primary" onClick={startBattery}>
              Start battery
            </button>
          </div>
        </div>

        <div className="ft-panel mt-16">
          <div className="ft-between">
            <div>
              <h2 className="section-heading">Your OLQ report</h2>
              <p className="body-text mt-8">
                See which of the 15 Officer Like Qualities your practice shows,
                and which to work on.
              </p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/ssb/olq")}
            >
              View report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
