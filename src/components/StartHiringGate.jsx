import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const GateContext = createContext(null);

// Wraps the whole app (see Layout.jsx) so every "Start hiring" entry
// point — however many places it's linked from — asks the same
// question before actually navigating there. A chunk of calls booked
// off /start-hiring turn out to be from job seekers who clicked the
// wrong CTA, not employers. This is a self-reported answer, not
// verification, so it won't stop someone determined to misrepresent
// themselves — it's aimed at filtering honest confusion before it
// reaches the booking calendar, not at malicious spam.
export function StartHiringGateProvider({ children }) {
  const [pendingTo, setPendingTo] = useState(null);
  const navigate = useNavigate();

  const ask = (to) => setPendingTo(to);
  const handleYes = () => {
    navigate(pendingTo);
    setPendingTo(null);
  };
  const handleNo = () => setPendingTo(null);

  return (
    <GateContext.Provider value={ask}>
      {children}
      {pendingTo && (
        <div className="gate-backdrop" onClick={handleNo}>
          <div
            className="gate-toast"
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm you're an employer"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you an employer looking to hire talent?</p>
            <div className="gate-actions">
              <button type="button" className="btn btn-secondary" onClick={handleNo}>
                No
              </button>
              <button type="button" className="btn btn-primary" onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}

// Drop-in replacement for react-router's <Link> for any "Start hiring"
// entry point — asks the gate question on click instead of navigating
// directly. A <button>, not an <a>, since the click no longer performs
// the navigation itself.
export function GatedStartHiringLink({ to, className, children }) {
  const ask = useContext(GateContext);
  return (
    <button type="button" className={className} onClick={() => ask(to)}>
      {children}
    </button>
  );
}
