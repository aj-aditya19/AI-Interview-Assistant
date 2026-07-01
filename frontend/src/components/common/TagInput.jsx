import React, { useState } from "react";

// Input that lets users type and press Enter to add string tags
export default function TagInput({ tags = [], onChange, placeholder = "Add and press Enter" }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    }
    // Backspace on empty input removes the last tag
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-input)",
        padding: "8px 12px",
        background: "var(--color-card)",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        cursor: "text",
      }}
      onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
    >
      {tags.map((tag, i) => (
        <span key={i} className="tag">
          {tag}
          <button className="tag-remove" onClick={() => removeTag(i)} type="button">×</button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "0.9375rem",
          color: "var(--color-text-primary)",
          minWidth: "120px",
          flex: 1,
        }}
      />
    </div>
  );
}
