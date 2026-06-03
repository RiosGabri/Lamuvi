(() => {
  const STORAGE_KEY = "lamuvi:a11yPrefs";

  const DEFAULT_PREFS = {
    v: 1,
    contrast: "default",
    text: "normal",
    spacing: "default",
    motion: "system",
    distraction: "default",
  };

  const OPTIONS = [
    {
      type: "toggle",
      key: "contrast",
      label: "Alto contraste",
      description: "Aumenta contraste, remove cinzas apagados e reforça bordas.",
      onValue: "high",
      offValue: "default",
    },
    {
      type: "choice",
      key: "text",
      label: "Tamanho do texto",
      description: "Aumenta textos de navegação, cards, sinopses, formulários e botões.",
      choices: [
        { label: "Normal", value: "normal" },
        { label: "Grande", value: "large" },
        { label: "Muito grande", value: "xlarge" },
      ],
    },
    {
      type: "toggle",
      key: "spacing",
      label: "Espaçamento confortável",
      description: "Aumenta respiro, altura de linha e áreas de toque para leitura com menos esforço.",
      onValue: "comfortable",
      offValue: "default",
    },
    {
      type: "toggle",
      key: "motion",
      label: "Reduzir movimento",
      description: "Remove animações, transições, zooms e rolagens suaves da interface.",
      onValue: "reduce",
      offValue: "system",
    },
    {
      type: "toggle",
      key: "distraction",
      label: "Interface sem distrações",
      description: "Oculta previews automáticas e simplifica sombras, brilhos e elementos decorativos.",
      onValue: "reduced",
      offValue: "default",
    },
  ];

  let prefs = loadPrefs();

  function loadPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...DEFAULT_PREFS, ...(saved && typeof saved === "object" ? saved : {}) };
    } catch (error) {
      return { ...DEFAULT_PREFS };
    }
  }

  function savePrefs(nextPrefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPrefs));
    } catch (error) {
      // Preferências continuam funcionando na sessão atual mesmo sem localStorage.
    }
  }

  function setDataAttribute(name, value, defaultValue) {
    const root = document.documentElement;

    if (!value || value === defaultValue) {
      delete root.dataset[name];
      return;
    }

    root.dataset[name] = value;
  }

  function applyPrefs(nextPrefs) {
    setDataAttribute("a11yContrast", nextPrefs.contrast, DEFAULT_PREFS.contrast);
    setDataAttribute("a11yText", nextPrefs.text, DEFAULT_PREFS.text);
    setDataAttribute("a11ySpacing", nextPrefs.spacing, DEFAULT_PREFS.spacing);
    setDataAttribute("a11yMotion", nextPrefs.motion, DEFAULT_PREFS.motion);
    setDataAttribute("a11yDistraction", nextPrefs.distraction, DEFAULT_PREFS.distraction);
  }

  function broadcastChange() {
    document.dispatchEvent(new CustomEvent("lamuvi:a11ychange", { detail: getPrefs() }));
  }

  function getPrefs() {
    return { ...DEFAULT_PREFS, ...prefs };
  }

  function setPref(key, value) {
    prefs = { ...getPrefs(), [key]: value };
    savePrefs(prefs);
    applyPrefs(prefs);
    updateControls();
    broadcastChange();
  }

  function resetPrefs() {
    prefs = { ...DEFAULT_PREFS };
    savePrefs(prefs);
    applyPrefs(prefs);
    updateControls();
    broadcastChange();
  }

  function prefersReducedMotion() {
    if (getPrefs().motion === "reduce") return true;
    return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function isDistractionReduced() {
    return getPrefs().distraction === "reduced";
  }

  function isEnabled(key, option) {
    return getPrefs()[key] === option.onValue;
  }

  function createToggle(option) {
    const label = document.createElement("label");
    label.className = "a11y-control";

    const text = document.createElement("span");
    text.className = "a11y-control__text";
    text.innerHTML = `<strong>${option.label}</strong><small>${option.description}</small>`;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "a11y-control__input";
    input.dataset.a11yKey = option.key;
    input.checked = isEnabled(option.key, option);
    input.addEventListener("change", () => {
      setPref(option.key, input.checked ? option.onValue : option.offValue);
    });

    const switchVisual = document.createElement("span");
    switchVisual.className = "a11y-switch";
    switchVisual.setAttribute("aria-hidden", "true");

    label.appendChild(text);
    label.appendChild(input);
    label.appendChild(switchVisual);

    return label;
  }

  function createChoice(option) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "a11y-choice";

    const legend = document.createElement("legend");
    legend.className = "a11y-choice__legend";
    legend.innerHTML = `<strong>${option.label}</strong><small>${option.description}</small>`;

    const choices = document.createElement("div");
    choices.className = "a11y-choice__items";

    option.choices.forEach((choice) => {
      const label = document.createElement("label");
      label.className = "a11y-choice__item";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `a11y-${option.key}`;
      input.value = choice.value;
      input.dataset.a11yKey = option.key;
      input.checked = getPrefs()[option.key] === choice.value;
      input.addEventListener("change", () => {
        if (input.checked) setPref(option.key, choice.value);
      });

      const text = document.createElement("span");
      text.textContent = choice.label;

      label.appendChild(input);
      label.appendChild(text);
      choices.appendChild(label);
    });

    fieldset.appendChild(legend);
    fieldset.appendChild(choices);

    return fieldset;
  }

  function createControl(option) {
    if (option.type === "choice") {
      return createChoice(option);
    }

    return createToggle(option);
  }

  function updateControls() {
    const controls = document.querySelectorAll("[data-a11y-key]");
    controls.forEach((control) => {
      const option = OPTIONS.find((item) => item.key === control.dataset.a11yKey);
      if (!option) return;

      if (control.type === "radio") {
        control.checked = getPrefs()[option.key] === control.value;
        return;
      }

      control.checked = isEnabled(option.key, option);
    });
  }

  function openPanel(panel, backdrop, trigger) {
    panel.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add("a11y-panel-open");
    trigger.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      panel.classList.add("a11y-panel--open");
      backdrop.classList.add("a11y-panel-backdrop--open");
      const firstControl = panel.querySelector("input, button");
      if (firstControl) firstControl.focus();
    });
  }

  function closePanel(panel, backdrop, trigger) {
    panel.classList.remove("a11y-panel--open");
    backdrop.classList.remove("a11y-panel-backdrop--open");
    document.body.classList.remove("a11y-panel-open");
    trigger.setAttribute("aria-expanded", "false");

    window.setTimeout(() => {
      panel.hidden = true;
      backdrop.hidden = true;
      trigger.focus();
    }, prefersReducedMotion() ? 0 : 180);
  }

  function mountPanel() {
    if (document.querySelector(".a11y-toggle")) return;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "a11y-toggle";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "a11y-panel");
    trigger.textContent = "Acessibilidade";

    const nav = document.querySelector(".main-header .nav-direita");
    if (nav) {
      nav.appendChild(trigger);
    } else {
      trigger.classList.add("a11y-toggle--floating");
      document.body.appendChild(trigger);
    }

    const backdrop = document.createElement("div");
    backdrop.className = "a11y-panel-backdrop";
    backdrop.hidden = true;

    const panel = document.createElement("aside");
    panel.id = "a11y-panel";
    panel.className = "a11y-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "a11y-panel-title");

    const header = document.createElement("div");
    header.className = "a11y-panel__header";
    header.innerHTML = `
      <div>
        <p class="a11y-panel__eyebrow">Lamuvi</p>
        <h2 id="a11y-panel-title">Preferências de acessibilidade</h2>
      </div>
    `;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "a11y-panel__close";
    closeButton.setAttribute("aria-label", "Fechar preferências de acessibilidade");
    closeButton.textContent = "×";
    header.appendChild(closeButton);

    const description = document.createElement("p");
    description.className = "a11y-panel__description";
    description.textContent = "Ajuste a interface para reduzir barreiras visuais, sensoriais e cognitivas. As preferências ficam salvas neste navegador.";

    const controls = document.createElement("div");
    controls.className = "a11y-panel__controls";
    OPTIONS.forEach((option) => controls.appendChild(createControl(option)));

    const footer = document.createElement("div");
    footer.className = "a11y-panel__footer";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "a11y-reset";
    resetButton.textContent = "Restaurar padrão";
    resetButton.addEventListener("click", resetPrefs);

    footer.appendChild(resetButton);

    panel.appendChild(header);
    panel.appendChild(description);
    panel.appendChild(controls);
    panel.appendChild(footer);

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    trigger.addEventListener("click", () => {
      if (panel.hidden) {
        openPanel(panel, backdrop, trigger);
      } else {
        closePanel(panel, backdrop, trigger);
      }
    });

    closeButton.addEventListener("click", () => closePanel(panel, backdrop, trigger));
    backdrop.addEventListener("click", () => closePanel(panel, backdrop, trigger));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        closePanel(panel, backdrop, trigger);
      }
    });

    updateControls();
  }

  applyPrefs(prefs);

  window.LamuviAcessibilidade = {
    getPrefs,
    setPref,
    resetPrefs,
    prefersReducedMotion,
    isDistractionReduced,
  };

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    prefs = loadPrefs();
    applyPrefs(prefs);
    updateControls();
    broadcastChange();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountPanel);
  } else {
    mountPanel();
  }
})();
