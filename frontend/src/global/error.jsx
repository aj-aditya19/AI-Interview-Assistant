const ErrorToast = ({ message, onMouseEnter, onMouseLeave, onClose }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#ff4d4f",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "white",
        padding: "12px 14px 12px 18px",
        borderRadius: "8px",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss error message"
        style={{
          border: "none",
          background: "transparent",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
};

export default ErrorToast;
