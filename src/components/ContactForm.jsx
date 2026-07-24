import { useState } from "react";
import { roles } from "../data/content.js";
import { pushEvent } from "../lib/analytics.js";

const emptyForm = { name: "", email: "", role: "", details: "" };

// Powers the homepage's "role details" form (FinalCTA), the Start Hiring
// page, the Contact page's general-inquiry form, and the Find a Job page
// — same fields underneath (name/email/role/details), same POST to
// /api/contact handled by server/index.js. `variant` swaps the role
// dropdown for a free-text field (and relabels the surrounding copy) for
// the "subject" (general contact) and "candidate" (job seeker) cases;
// `variant` is sent along with the payload so the server can pick the
// right email copy for each (see server/emailTemplates.js).
export default function ContactForm({
  variant = "role",
  title,
  subtitle,
  submitLabel = "Send",
  successTitle = "Thanks — we've got your details",
  successBody = "We'll get back to you shortly.",
}) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, variant }),
      });
      if (res.ok) {
        setStatus("success");
        setForm(emptyForm);
        pushEvent("contact_form_submit", { form_variant: variant });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="role-form">
        <div className="form-success">
          <h3>{successTitle}</h3>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>{successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="role-form">
      <form onSubmit={handleSubmit}>
        {title && <h3>{title}</h3>}
        {subtitle && <p className="form-sub">{subtitle}</p>}

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
            <label htmlFor="email">{variant === "role" ? "Work email" : "Email address"}</label>
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
            {variant === "role" ? (
              <>
                <label htmlFor="role">Role you're hiring for</label>
                <select id="role" name="role" value={form.role} onChange={handleChange} required>
                  <option value="" disabled>
                    Select a role
                  </option>
                  {roles.map((r) => (
                    <option key={r.title}>{r.title}</option>
                  ))}
                  <option>Something else</option>
                </select>
              </>
            ) : variant === "candidate" ? (
              <>
                <label htmlFor="role">What are you looking to do?</label>
                <input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Bookkeeping, sales, admin support, development"
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="role">Subject</label>
                <input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="What can we help with?"
                  required
                />
              </>
            )}
          </div>
          <div className="field full">
            <label htmlFor="details">
              {variant === "role" ? "A little about the role" : variant === "candidate" ? "Tell us about yourself" : "Message"}
            </label>
            <textarea
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder={
                variant === "role"
                  ? "Hours per week, key skills or software, and anything else that helps us understand what you need."
                  : variant === "candidate"
                  ? "Your skills, experience, availability, and English level."
                  : "Tell us a bit more about what you need."
              }
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>

        {status === "error" && (
          <p className="form-note" style={{ color: "#e5484d" }}>
            Something went wrong. Please email us instead.
          </p>
        )}
      </form>
    </div>
  );
}
