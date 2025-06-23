import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    const res = await fetch("https://nervia-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    const botMessage = { sender: "bot", text: data.response };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>NervIA Chat</h1>
      <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "200px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.sender === "user" ? "Tú" : "NervIA"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginTop: "1rem", width: "70%" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "1rem" }}>Enviar</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
