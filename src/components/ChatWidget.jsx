import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBubbleIcon, CloseIcon, SendIcon } from "./icons.jsx";
import { getRecaptchaToken } from "../lib/recaptcha.js";
import { BRAND, CONTACT_EMAIL } from "../data/content.js";

const STORAGE_KEY = "chat_messages";

// Shown in the UI but never sent to the API — it's canned copy, not a
// real model turn, and the Messages API requires the first message in
// a request to be from the user. Always messages[0]; every function
// below that builds an API payload drops it via .slice(1).
const GREETING = {
  role: "assistant",
  content: `Hi! I'm here to help with anything about hiring through ${BRAND} — pricing, how it works, or getting you started. What can I help with?`,
};

function loadMessages() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — fall through
  }
  return [GREETING];
}

// Guided shortcuts shown only before the first real exchange (see
// `messages.length === 1` below) — mirrors the quick-reply pattern on
// sites like hirewithnear.com's chat widget. Each maps to phrasing
// chosen to reliably hit a specific bucket in server/chatDemoMode.js
// (and reads naturally to the real Claude-backed path too, once that's
// live), so clicking one is guaranteed to land a solid answer instead
// of depending on freeform typing.
const QUICK_REPLIES = [
  { label: "💰 Pricing", text: "What's your pricing?" },
  { label: "🧑‍💼 Roles we place", text: "What roles do you place?" },
  { label: "⚙️ How it works", text: "How does it work?" },
  { label: "💬 Talk to sales", text: "I'd like to talk to your team" },
];

// A live model call already takes a second or so and feels like it's
// "thinking"; the keyword-matched demo-mode fallback (server/
// chatDemoMode.js) resolves in milliseconds, which reads as broken/
// instant rather than helpful. Padding every response to a minimum
// delay keeps the typing indicator meaningful either way.
const MIN_RESPONSE_MS = 700;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [escalate, setEscalate] = useState(null); // { reason } once the bot hands off
  const [handoff, setHandoff] = useState({ name: "", email: "" });
  const [handoffStatus, setHandoffStatus] = useState("idle"); // idle | sending | success | error
  const listRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // best-effort persistence only
    }
  }, [messages]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, sending, escalate]);

  const sendText = async (text) => {
    if (!text || sending) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    const startedAt = Date.now();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });
      const data = await res.json();

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_RESPONSE_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_RESPONSE_MS - elapsed));
      }

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Something went wrong — please try again." },
        ]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.escalate) setEscalate({ reason: data.reason || "Visitor requested a human." });
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Something went wrong — please try again or email us at ${CONTACT_EMAIL}.` },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendText(input.trim());
  };

  const handleHandoffSubmit = async (e) => {
    e.preventDefault();
    setHandoffStatus("sending");

    try {
      const recaptchaToken = await getRecaptchaToken("chat_escalate");
      const transcript = messages
        .slice(1)
        .map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.content}`)
        .join("\n\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: handoff.name,
          email: handoff.email,
          role: escalate.reason,
          details: transcript,
          variant: "chat",
          recaptchaToken,
        }),
      });

      if (res.ok) {
        setHandoffStatus("success");
      } else {
        setHandoffStatus("error");
      }
    } catch {
      setHandoffStatus("error");
    }
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-header">
              <span>{BRAND}</span>
              <button
                type="button"
                className="chat-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="chat-messages" ref={listRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                  {m.content}
                </div>
              ))}
              {messages.length === 1 && !sending && !escalate && (
                <div className="chat-quick-replies">
                  {QUICK_REPLIES.map((q) => (
                    <button key={q.label} type="button" onClick={() => sendText(q.text)}>
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
              {sending && (
                <div className="chat-bubble chat-bubble-assistant chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {escalate && (
                <div className="chat-handoff">
                  {handoffStatus === "success" ? (
                    <p className="chat-handoff-success">
                      Thanks — we've got your details. Someone from our team will follow up shortly.
                    </p>
                  ) : (
                    <form onSubmit={handleHandoffSubmit}>
                      <p className="chat-handoff-note">Leave your details and we'll take it from here.</p>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={handoff.name}
                        onChange={(e) => setHandoff({ ...handoff, name: e.target.value })}
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={handoff.email}
                        onChange={(e) => setHandoff({ ...handoff, email: e.target.value })}
                      />
                      <button type="submit" className="btn btn-primary" disabled={handoffStatus === "sending"}>
                        {handoffStatus === "sending" ? "Sending…" : "Send"}
                      </button>
                      {handoffStatus === "error" && (
                        <p className="chat-handoff-error">Something went wrong — please try again.</p>
                      )}
                    </form>
                  )}
                </div>
              )}
            </div>

            {!escalate && (
              <form className="chat-input-row" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Ask about pricing, roles, how it works…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={sending}
                />
                <button type="submit" aria-label="Send message" disabled={sending || !input.trim()}>
                  <SendIcon size={16} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <CloseIcon size={22} /> : <ChatBubbleIcon size={22} />}
      </button>
    </div>
  );
}
