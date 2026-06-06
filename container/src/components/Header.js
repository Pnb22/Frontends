import React from "react";

export default function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Micro Frontends + Module Federation</p>
        <h1>Food Delivery MFE</h1>
      </div>

      <div className="app-header__badge" aria-label="Status da vitrine">
        Online
      </div>
    </header>
  );
}
