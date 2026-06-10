import {
  durationOptions,
  getSetupFields,
  trackOptions,
} from "../utils/constatns.jsx";
import "../styles/InterviewSetup.css";

const TRACK_ICONS = { internship: "🎓", job: "💼", language: "🌍" };

function InterviewSetup({
  setup,
  onChange,
  onSubmit,
  startingInterview,
  setupError,
  onTrackChange,
}) {
  const fields = getSetupFields(setup.track);

  const renderField = (f) => {
    if (f.type === "multiselect") {
      const vals = setup[f.name] || [];
      return (
        <div className="sf full" key={f.name}>
          <label>
            {f.label}
            {f.required && <em>*</em>}
          </label>
          <div className="tags-wrap">
            {vals.map((v) => (
              <span key={v} className="stag">
                {v}
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      f.name,
                      vals.filter((x) => x !== v),
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <select
            className="tag-sel"
            value=""
            onChange={(e) => {
              if (!e.target.value) return;
              if (!vals.includes(e.target.value))
                onChange(f.name, [...vals, e.target.value]);
            }}
          >
            <option value="">+ Add technology</option>
            {(f.suggestions || []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <small className="sf-hint">
            Popular: {(f.suggestions || []).slice(0, 6).join(", ")}
          </small>
        </div>
      );
    }
    if (f.type === "select")
      return (
        <div className="sf" key={f.name}>
          <label>
            {f.label}
            {f.required && <em>*</em>}
          </label>
          <select
            value={setup[f.name] || ""}
            onChange={(e) => onChange(f.name, e.target.value)}
            required={f.required}
          >
            <option value="">Select one</option>
            {(f.options || []).map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    if (f.type === "textarea")
      return (
        <div className="sf full" key={f.name}>
          <label>
            {f.label}
            {f.required && <em>*</em>}
          </label>
          <textarea
            value={setup[f.name] || ""}
            onChange={(e) => onChange(f.name, e.target.value)}
            placeholder={f.placeholder}
            required={f.required}
          />
        </div>
      );
    return (
      <div className="sf" key={f.name}>
        <label>
          {f.label}
          {f.required && <em>*</em>}
        </label>
        <input
          list={f.suggestions ? `${f.name}-dl` : undefined}
          value={setup[f.name] || ""}
          onChange={(e) => onChange(f.name, e.target.value)}
          placeholder={f.placeholder}
          required={f.required}
        />
        {f.suggestions && (
          <datalist id={`${f.name}-dl`}>
            {f.suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
        {f.suggestions && (
          <small className="sf-hint">
            Suggestions: {f.suggestions.slice(0, 5).join(", ")}
          </small>
        )}
      </div>
    );
  };

  return (
    <div className="setup">
      <div className="setup-hero">
        <div className="setup-badge">⚡ AI Interview Assistant</div>
        <h2>
          Ready to practice your <span>interview?</span>
        </h2>
        <p>Set your track and we'll generate personalized questions for you.</p>
      </div>

      <form className="setup-card" onSubmit={onSubmit}>
        <div>
          <p className="setup-section-lbl">Choose your interview track</p>
          <div className="setup-tracks">
            {trackOptions.map((t) => (
              <button
                key={t.value}
                type="button"
                className={`track-btn ${setup.track === t.value ? "active" : ""}`}
                onClick={() => onTrackChange(t.value)}
              >
                <div className="track-icon">{TRACK_ICONS[t.value]}</div>
                <strong>{t.label}</strong>
                <span>{t.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="setup-section-lbl">Interview settings</p>
          <div className="setup-fields">
            <div className="sf">
              <label>
                Duration<em>*</em>
              </label>
              <select
                value={setup.durationMinutes}
                onChange={(e) => onChange("durationMinutes", e.target.value)}
                required
              >
                {durationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d} minutes
                  </option>
                ))}
              </select>
            </div>
            {fields.map((f) => renderField(f))}
          </div>
        </div>

        {setupError && <div className="setup-err">⚠ {setupError}</div>}

        <button
          className="setup-submit"
          type="submit"
          disabled={startingInterview}
        >
          {startingInterview ? (
            <>
              <span className="spin">⟳</span> Preparing your interview…
            </>
          ) : (
            <>🚀 Start Interview</>
          )}
        </button>
      </form>
    </div>
  );
}

export default InterviewSetup;
