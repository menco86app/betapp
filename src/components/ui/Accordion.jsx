// src/components/ui/Accordion.jsx
import { useState } from "react";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}
