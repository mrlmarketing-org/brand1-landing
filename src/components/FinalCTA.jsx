import { useState } from "react";
import { roles } from "../data/content.js";
import BookButton from "./BookButton.jsx";

// ============================================================
// Submissions post to /api/contact, handled by server/index.js,
// which emails CONTACT_TO_EMAIL via Resend. Set RESEND_API_KEY and
// CONTACT_TO_EMAIL in .env (see .env.example) to make it live.
// ============================================================
const emptyForm = { name: "", email: "", role: "", details: "" };

// SECTION 10 — Final CTA. The id="book" here is where every
// "Book a call" button scrolls to when no booking link is set.
export default function FinalCTA() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="final-cta" id="book">
      <div className="container">
        <div className="final-inner">
          <h2>Tell us the role. We'll bring you the person.</h2>
          <p>
            One call is all it takes to get started. We'll learn what you need,
            and you'll have vetted candidates in hand within days — for one flat
            fee, paid once.
          </p>
          <div className="final-actions">
            <BookButton large />
          </div>

          <div className="role-form">
            {status === "success" ? (
              <div className="form-success">
                <h3>Thanks — we've got your details</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
                  We'll reach out shortly to scope the role with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Or send us the role details and we'll reach out</h3>
                <p className="form-sub">
                  Prefer not to book yet? Give us the basics and we'll be in
                  touch.
                </p>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Work email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                  <div className="field full">
                    <label htmlFor="role">Role you're hiring for</label>
                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((r) => (
                        <option key={r.title}>{r.title}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="details">A little about the role</label>
                    <textarea
                      id="details"
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      placeholder="Hours per week, key skills or software, and anything else that helps us understand what you need."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send role details"}
                </button>

                {status === "error" && (
                  <p className="form-note" style={{ color: "#f0a0a0" }}>
                    Something went wrong. Please email us instead.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
