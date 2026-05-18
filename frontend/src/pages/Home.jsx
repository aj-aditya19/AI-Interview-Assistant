import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { groqAPI } from "../utils/api";
import "../styles/Home.css";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [loadingReply, setLoadingReply] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <p className="home-loading">Loading user info...</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      setError("Please enter some text first.");
      return;
    }

    try {
      setLoadingReply(true);
      setError("");
      setReplyText("");

      const response = await groqAPI.reply(trimmedText);
      setReplyText(response.data.reply || "No reply received.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not get a reply from Groq.",
      );
    } finally {
      setLoadingReply(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h2>Interview Assistant</h2>
          <p>
            Hello, <strong>{user.name}</strong>. Send text to Groq and read the
            reply on the right.
          </p>
        </div>
        <button
          className="home-logout"
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>

      <div className="home-grid">
        <form className="home-box home-input-box" onSubmit={handleSubmit}>
          <label htmlFor="groq-input">Your text</label>
          <textarea
            id="groq-input"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Type a question, prompt, or interview answer here..."
            rows="12"
          />
          {error ? <p className="home-error">{error}</p> : null}
          <button type="submit" disabled={loadingReply}>
            {loadingReply ? "Getting reply..." : "Send to Groq"}
          </button>
        </form>

        <div className="home-box home-reply-box">
          <label>Groq reply</label>
          <div className="home-reply-content">
            {loadingReply ? (
              <p>Waiting for Groq response...</p>
            ) : replyText ? (
              <p>{replyText}</p>
            ) : (
              <p className="home-placeholder">Your reply will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
