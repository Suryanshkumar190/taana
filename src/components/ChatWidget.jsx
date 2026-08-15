import { useEffect, useRef, useState } from "react";

const STARTER = {
  role: "assistant",
  text: "Namaste! Tell me what you're looking for — an occasion, a budget, a fabric weight — and I'll point you to a piece from the catalog.",
};

export default function ChatWidget({ prefill, onPrefillConsumed }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (prefill) {
      setOpen(true);
      setInput(prefill);
      onPrefillConsumed?.();
    }
  }, [prefill, onPrefillConsumed]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user", text: content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== STARTER)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close weaving guide" : "Open weaving guide"}
      >
        {open ? "✕" : "Ask a weaving guide"}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Taana weaving guide chat">
          <div className="chat-panel-head">
            <strong>Weaving guide</strong>
            <span>AI-assisted, catalog-grounded</span>
          </div>

          <div className="chat-list" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble assistant chat-typing">Thinking…</div>}
            {error && <div className="chat-error">{error}</div>}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. lightweight saree for a summer wedding"
              aria-label="Message the weaving guide"
            />
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
