import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBubbleIcon, CloseIcon } from "./icons.jsx";
import Logo from "./Logo.jsx";
import { getRecaptchaToken } from "../lib/recaptcha.js";
import { openCalendlyPopup } from "../lib/calendly.js";
import { howWeHelp } from "./Solution.jsx";
import { BRAND, PRICING_RATE_LOW, PRICING_RATE_HIGH, locations } from "../data/content.js";

const STORAGE_KEY = "chat_state";
// After choosing to go to the form, the widget navigates immediately
// but stays open just long enough to show the confirmation + "ended"
// state before collapsing — so it reads as "handled, then got out of
// the way" rather than either lingering over the new page or vanishing
// with no acknowledgment.
const JOB_COLLAPSE_DELAY_MS = 1200;

// A guided, button-driven flow — no free-text conversation box. The
// only place a visitor types is the final lead-capture form.
const GREETING = {
  role: "assistant",
  content: `Welcome to ${BRAND} — we're committed to streamlining your hiring process and connecting you with top talent for your business needs. Are you:`,
};

const TOP_OPTIONS = [
  { label: "Looking to hire someone", value: "hire" },
  { label: "Looking for a job", value: "job" },
];

const BOOK_A_CALL_OPTION = { label: "Book a call", value: "book-a-call" };

const HIRE_OPTIONS = [
  BOOK_A_CALL_OPTION,
  { label: "Tell me about your services", value: "services" },
  { label: "I want to learn about pricing", value: "pricing" },
  { label: "Other", value: "other" },
];

const BOOK_A_CALL_NUDGE =
  "We would love to help you with your staffing needs — would you like to book a call with us?";

const JOB_FORM_OPTIONS = [
  { label: "Yes, take me to the form", value: "yes" },
  { label: "No, not yet", value: "no" },
];

function loadState() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — fall through
  }
  return { messages: [GREETING], stage: "welcome" };
}

export default function ChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ messages, stage }, setChatState] = useState(loadState);
  const [handoff, setHandoff] = useState({ name: "", email: "", message: "" });
  const [handoffStatus, setHandoffStatus] = useState("idle"); // idle | sending | success | error
  const listRef = useRef(null);
  const collapseTimer = useRef(null);

  // True once a workflow has run its course — booking a call, or
  // successfully submitting the "Other" contact form. Derived rather
  // than its own bit of state so it can't drift out of sync with
  // `stage`/`handoffStatus`, which already fully determine it.
  const ended = stage === "ended" || (stage === "contact-form" && handoffStatus === "success");

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, stage }));
    } catch {
      // best-effort persistence only
    }
  }, [messages, stage]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, stage, open, handoffStatus]);

  // Locks the page behind the widget from scrolling while it's open.
  // `body.style.overflow` alone does nothing against Lenis (src/lib/
  // smoothScroll.js), which hijacks wheel/touch input for the whole app
  // and scrolls manually, independent of the CSS overflow property —
  // toggling Lenis's own stop()/start() around `open` was tried first,
  // but it raced with Lenis's rAF loop and occasionally fired a huge
  // stray scrollTo once resumed (reproduced under sustained scrolling
  // in testing — one bad jump, then nothing further). Lenis's actual
  // documented fix for "let this element scroll natively, and don't
  // chain it to the page" is the `data-lenis-prevent` attribute on
  // .chat-messages below — Lenis skips its own handling for wheel
  // events targeting that element entirely, so native scrolling (and
  // native overscroll-behavior:contain) applies with no Lenis
  // involvement at all, and no start/stop lifecycle to race against.
  // This CSS lock only has to cover the *rest* of the panel (header,
  // buttons) where there's nothing to scroll but Lenis would otherwise
  // still try to scroll the page underneath.
  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  useEffect(() => () => clearTimeout(collapseTimer.current), []);

  const say = (role, content) => ({ role, content });

  const chooseTopOption = (option) => {
    if (option.value === "job") {
      setChatState((s) => ({
        stage: "job-menu",
        messages: [
          ...s.messages,
          say("user", option.label),
          say("assistant", "We have a form you can fill out for this — would you like to fill it out now?"),
        ],
      }));
      return;
    }

    setChatState((s) => ({
      stage: "hire-menu",
      messages: [...s.messages, say("user", option.label), say("assistant", "How can I help?")],
    }));
  };

  const chooseJobOption = (option) => {
    if (option.value === "yes") {
      setChatState((s) => ({
        stage: "ended",
        messages: [...s.messages, say("user", option.label), say("assistant", "Great — taking you there now.")],
      }));
      navigate("/find-a-job");
      collapseTimer.current = setTimeout(() => setOpen(false), JOB_COLLAPSE_DELAY_MS);
      return;
    }

    // "No, not yet"
    setChatState((s) => ({
      stage: "ended",
      messages: [...s.messages, say("user", option.label), say("assistant", "No worries — reach out anytime.")],
    }));
  };

  const chooseHireOption = (option) => {
    if (option.value === "book-a-call") {
      setChatState((s) => ({
        stage: "ended",
        messages: [
          ...s.messages,
          say("user", option.label),
          say("assistant", "Opening our calendar for you now…"),
        ],
      }));
      openCalendlyPopup();
      return;
    }

    if (option.value === "services") {
      const helpList = howWeHelp.map((h) => `• ${h.title} — ${h.body}`).join("\n");
      const regions = locations.map((l) => l.name).join(", ");
      const reply = [
        "We help businesses hire pre-vetted remote professionals across a variety of roles, including customer support, virtual assistance, bookkeeping, administrative support, sales, marketing, and software development.",
        `Here's how we help:\n${helpList}`,
        `We source talent from: ${regions}.`,
        BOOK_A_CALL_NUDGE,
      ].join("\n\n");
      setChatState((s) => ({
        stage: "nudge-book-call",
        messages: [...s.messages, say("user", option.label), say("assistant", reply)],
      }));
      return;
    }

    if (option.value === "pricing") {
      const reply = [
        `A one-time placement fee — typically ${PRICING_RATE_LOW}–${PRICING_RATE_HIGH}% of your hire's first-year salary, depending on the role. No monthly markup, ever. You pay your hire's wage directly.`,
        "Plus, if it's not a fit in the first two weeks, you get your money back.",
        BOOK_A_CALL_NUDGE,
      ].join("\n\n");
      setChatState((s) => ({
        stage: "nudge-book-call",
        messages: [...s.messages, say("user", option.label), say("assistant", reply)],
      }));
      return;
    }

    // "Other"
    setChatState((s) => ({
      stage: "contact-form",
      messages: [...s.messages, say("user", option.label)],
    }));
  };

  const startNewChat = () => {
    setChatState({ messages: [GREETING], stage: "welcome" });
    setHandoff({ name: "", email: "", message: "" });
    setHandoffStatus("idle");
  };

  const handleHandoffSubmit = async (e) => {
    e.preventDefault();
    setHandoffStatus("sending");

    try {
      const recaptchaToken = await getRecaptchaToken("chat_escalate");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: handoff.name,
          email: handoff.email,
          role: "Other — general inquiry via chat",
          details: handoff.message,
          variant: "chat",
          recaptchaToken,
        }),
      });

      setHandoffStatus(res.ok ? "success" : "error");
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
              <div className="chat-header-brand">
                <Logo size={22} showWord={false} />
                <div className="chat-header-title">Reach out to us</div>
              </div>
              <button
                type="button"
                className="chat-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* data-lenis-prevent: Lenis's own documented escape hatch —
                without it, Lenis's wheel listener intercepts scroll input
                over this element before the browser ever gets to apply
                native overflow scrolling to it, so internal scrolling
                never worked even with Lenis stopped below (stopping the
                library doesn't detach that listener). This is the actual
                fix for scrolling inside the message list; the body/html
                lock in the effect above is a separate concern (keeping
                the *page* from scrolling while hovering non-scrolling
                parts of the panel, like the header). */}
            <div className="chat-messages" ref={listRef} data-lenis-prevent>
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                  {m.content}
                </div>
              ))}

              {stage === "welcome" && (
                <div className="chat-quick-replies">
                  {TOP_OPTIONS.map((o) => (
                    <button key={o.value} type="button" onClick={() => chooseTopOption(o)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              {stage === "job-menu" && (
                <div className="chat-quick-replies">
                  {JOB_FORM_OPTIONS.map((o) => (
                    <button key={o.value} type="button" onClick={() => chooseJobOption(o)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              {stage === "hire-menu" && (
                <div className="chat-quick-replies">
                  {HIRE_OPTIONS.map((o) => (
                    <button key={o.value} type="button" onClick={() => chooseHireOption(o)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              {stage === "nudge-book-call" && (
                <div className="chat-quick-replies">
                  <button type="button" onClick={() => chooseHireOption(BOOK_A_CALL_OPTION)}>
                    {BOOK_A_CALL_OPTION.label}
                  </button>
                </div>
              )}

              {stage === "contact-form" && (
                <div className="chat-handoff">
                  {handoffStatus === "success" ? (
                    <p className="chat-handoff-success">
                      Thanks — we've got your details. Someone from our team will follow up shortly.
                    </p>
                  ) : (
                    <form onSubmit={handleHandoffSubmit}>
                      <p className="chat-handoff-note">Tell us what's on your mind and we'll get back to you.</p>
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
                      <textarea
                        placeholder="Your message"
                        required
                        value={handoff.message}
                        onChange={(e) => setHandoff({ ...handoff, message: e.target.value })}
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

              {ended && <p className="chat-ended-note">Your conversation has ended.</p>}
            </div>

            {ended && (
              <div className="chat-restart-row">
                <button type="button" onClick={startNewChat}>
                  Start a new chat
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={open ? "chat-toggle chat-toggle-open" : "chat-toggle chat-toggle-closed"}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <CloseIcon size={22} />
        ) : (
          <>
            <ChatBubbleIcon size={20} />
            <span>Chat with us</span>
          </>
        )}
      </button>
    </div>
  );
}
