/*
  Yeezik Games Hub — link di ritorno all'hub
  ------------------------------------------
  Uso in qualsiasi gioco:
    1. nel <head> o in fondo al <body>:
       <script src="https://yeezikdev.github.io/yeezik-gameshub/hub-link.js" defer></script>
    2. dove vuoi il riquadro:
       <yeezik-hub-link></yeezik-hub-link>

  Funziona anche dentro HTML creato da JavaScript (innerHTML).
  Gli stili sono isolati: non tocca la grafica del gioco.
*/
(function () {
  if (customElements.get("yeezik-hub-link")) return;

  const HUB_URL = "https://yeezikdev.github.io/yeezik-gameshub/";

  const CSS = `
    :host { display: block; width: 100%; max-width: 420px; margin: 22px auto 6px; }
    a {
      display: flex; align-items: center; gap: 14px;
      padding: 12px 18px 12px 12px; border-radius: 999px;
      text-decoration: none; color: #f4f6ff;
      font-family: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 12% 50%, rgba(122, 92, 255, .35), transparent 45%),
        linear-gradient(135deg, #0b0f24, #03040b);
      border: 1px solid rgba(191, 230, 255, .22);
      box-shadow: 0 10px 30px -12px rgba(0, 0, 0, .7), 0 0 24px -10px rgba(120, 170, 255, .6);
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
      -webkit-tap-highlight-color: transparent;
      position: relative; overflow: hidden;
    }
    a:hover, a:focus-visible {
      transform: translateY(-2px); border-color: rgba(191, 230, 255, .5);
      box-shadow: 0 14px 34px -12px rgba(0, 0, 0, .8), 0 0 34px -6px rgba(120, 170, 255, .75);
      outline: none;
    }
    a:active { transform: scale(.98); }
    .stars {
      position: absolute; inset: 0; pointer-events: none; opacity: .7;
      background-image:
        radial-gradient(1px 1px at 30% 30%, #fff, transparent),
        radial-gradient(1px 1px at 55% 75%, #cfe6ff, transparent),
        radial-gradient(1px 1px at 78% 25%, #fff, transparent),
        radial-gradient(1px 1px at 90% 70%, #fff, transparent),
        radial-gradient(1px 1px at 45% 50%, #9cc4ff, transparent);
      animation: drift 18s linear infinite;
    }
    @keyframes drift { to { background-position: -120px 0; } }
    .orbit { position: relative; flex: none; width: 50px; height: 50px; display: grid; place-items: center; }
    .planet {
      position: relative; z-index: 1; width: 32px; height: 32px; border-radius: 50%;
      background:
        radial-gradient(circle at 32% 30%, rgba(255,255,255,.6), transparent 38%),
        radial-gradient(circle at 70% 75%, rgba(0,0,0,.6), transparent 60%),
        linear-gradient(135deg, #ff5a3d, #7a5cff 55%, #1fc8a8);
      box-shadow: 0 0 18px -2px #7a5cff, inset -4px -5px 10px rgba(0,0,0,.5);
      animation: pulse 3s ease-in-out infinite;
    }
    @keyframes pulse { 50% { box-shadow: 0 0 26px 0 #7a5cff, inset -4px -5px 10px rgba(0,0,0,.5); } }
    .ring { position: absolute; width: 50px; height: 15px; border-radius: 50%; border: 2px solid #bfe6ff; transform: rotate(-18deg); opacity: .8; }
    .ring.b { clip-path: inset(0 0 50% 0); }
    .ring.f { clip-path: inset(50% 0 0 0); z-index: 2; }
    .moon { position: absolute; z-index: 3; width: 6px; height: 6px; border-radius: 50%; background: #dfe7ff; box-shadow: 0 0 8px #9cc4ff; offset-path: ellipse(24px 7px at 50% 50%); animation: moon 4s linear infinite; }
    @supports not (offset-path: ellipse(1px 1px)) { .moon { display: none; } }
    @keyframes moon { to { offset-distance: 100%; } }
    .txt { position: relative; display: grid; gap: 2px; min-width: 0; flex: 1; text-align: left; }
    .txt small { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #9fb0d6; }
    .txt b { font-size: 15px; font-weight: 700; letter-spacing: .01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .arrow { position: relative; flex: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #bfe6ff; color: #03040b; transition: transform .2s; }
    a:hover .arrow { transform: translateX(3px); }
    .arrow svg { width: 16px; height: 16px; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
  `;

  class YeezikHubLink extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const testo = this.getAttribute("testo") || "Scopri gli altri giochi";
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
        <style>${CSS}</style>
        <a href="${HUB_URL}" part="link" aria-label="Yeezik Games Hub: ${testo}">
          <span class="stars"></span>
          <span class="orbit" aria-hidden="true">
            <span class="ring b"></span><span class="planet"></span><span class="ring f"></span><span class="moon"></span>
          </span>
          <span class="txt"><small>${testo}</small><b>Yeezik Games Hub</b></span>
          <span class="arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>`;
    }
  }
  customElements.define("yeezik-hub-link", YeezikHubLink);
})();
