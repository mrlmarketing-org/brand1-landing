import { createContext, useCallback, useContext, useRef, useState } from "react";

const EmployerGateContext = createContext(null);

// A small "are you an employer?" confirm step for the two actions that
// are specifically for businesses looking to hire — booking a call and
// sending role details — since job seekers occasionally land on those
// by mistake. Unlike the old gate this replaced (which sat in front of
// every /start-hiring link and blocked navigation), this wraps a single
// action: call `confirm(action)` right where that action would normally
// run, and `action` only fires if the visitor answers yes.
export function EmployerGateProvider({ children }) {
  const [pending, setPending] = useState(false);
  const actionRef = useRef(null);

  const confirm = useCallback((action) => {
    actionRef.current = action;
    setPending(true);
  }, []);

  const handleYes = () => {
    setPending(false);
    actionRef.current?.();
    actionRef.current = null;
  };
  const handleNo = () => {
    setPending(false);
    actionRef.current = null;
  };

  return (
    <EmployerGateContext.Provider value={confirm}>
      {children}
      {pending && (
        <div className="gate-backdrop" onClick={handleNo}>
          <div
            className="gate-modal"
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
    </EmployerGateContext.Provider>
  );
}

// Returns a `confirm(action)` function. Components outside the provider
// (there shouldn't be any — it wraps the whole app in Layout.jsx) get a
// no-op fallback so calling it never throws.
export function useEmployerGate() {
  const confirm = useContext(EmployerGateContext);
  return confirm || ((action) => action());
}
