import {
  durationOptions,
  getSetupFields,
  interviewLevelOptions,
  trackOptions,
} from "../utils/constatns.jsx";
import "../styles/InterviewSetup.css";

function InterviewSetup({
  setup,
  onChange,
  onSubmit,
  startingInterview,
  setupError,
  onTrackChange,
}) {
  const visibleFields = getSetupFields(setup.track);

  return (
    <form className="home-box home-setup-box" onSubmit={onSubmit}>
      <div className="home-box-head">
        <div>
          <label>Interview setup</label>
          <p>
            Choose a track, fill in your context, and the AI will shape the
            interview around it.
          </p>
        </div>
        <span className="home-badge">Step 1</span>
      </div>

      <div
        className="home-track-grid"
        role="radiogroup"
        aria-label="Interview track"
      >
        {trackOptions.map((track) => (
          <button
            key={track.value}
            type="button"
            className={`home-track-card ${setup.track === track.value ? "is-active" : ""}`}
            onClick={() =>
              onTrackChange(
                track.value,
                console.log("Track change:", track.value),
              )
            }
          >
            <strong>{track.label}</strong>
            <span>{track.description}</span>
          </button>
        ))}
      </div>

      <div className="home-setup-grid">
        <label className="home-field">
          <span>
            Interview time <em className="home-required">*</em>
          </span>
          <select
            value={setup.durationMinutes}
            onChange={(event) =>
              onChange(
                "durationMinutes",
                event.target.value,
                console.log("Duration change:", event.target.value),
              )
            }
            required
          >
            {durationOptions.map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </label>

        {visibleFields.map((field) => (
          <label key={field.name} className="home-field">
            <span>
              {field.label}
              {field.required ? <em className="home-required">*</em> : null}
            </span>
            {field.type === "select" ? (
              <select
                value={setup[field.name]}
                onChange={(event) => {
                  onChange(field.name, event.target.value);

                  console.log(
                    `Field ${field.name} change:`,
                    event.target.value,
                  );
                }}
                required={field.required}
              >
                <option value="">Select one</option>

                {(field.options || interviewLevelOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "multiselect" ? (
              <div className="multi-select-container">
                <div className="selected-tags">
                  {(setup[field.name] || []).map((item) => (
                    <div key={item} className="tag">
                      {item}

                      <button
                        type="button"
                        onClick={() => {
                          const updated = setup[field.name].filter(
                            (value) => value !== item,
                          );

                          onChange(field.name, updated);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <select
                  value=""
                  onChange={(event) => {
                    const value = event.target.value;

                    if (!value) return;

                    const currentValues = setup[field.name] || [];

                    if (!currentValues.includes(value)) {
                      onChange(field.name, [...currentValues, value]);
                    }
                  }}
                >
                  <option value="">Select technologies</option>

                  {field.suggestions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                value={setup[field.name]}
                onChange={(event) => onChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                rows="3"
                required={field.required}
              />
            ) : (
              <>
                <input
                  list={`${field.name}-options`}
                  value={setup[field.name]}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
                {field.suggestions ? (
                  <datalist id={`${field.name}-options`}>
                    {field.suggestions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                ) : null}
              </>
            )}
            {field.suggestions ? (
              <small className="home-field-hint">
                Suggestions: {field.suggestions.slice(0, 5).join(", ")}
              </small>
            ) : null}
          </label>
        ))}
      </div>

      {setupError ? <p className="home-error">{setupError}</p> : null}

      <button
        className="home-primary-button"
        type="submit"
        disabled={startingInterview}
      >
        {startingInterview
          ? "Preparing interview..."
          : "Start tailored interview"}
      </button>
    </form>
  );
}

export default InterviewSetup;
