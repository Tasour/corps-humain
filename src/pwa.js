/* Installation PWA : service worker, invite native et aide iOS. */

let deferredPrompt = null;
let toastFn = () => {};

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function syncInstallButtons() {
  const standalone = isStandalone();
  const showTop = !standalone && (!!deferredPrompt || isIOS());
  document.querySelectorAll("[data-install-top]").forEach((btn) => {
    btn.hidden = !showTop;
  });
  document.querySelectorAll("[data-install-block]").forEach((block) => {
    block.hidden = standalone;
  });
}

export function setupPWA({ toast } = {}) {
  toastFn = toast || toastFn;

  if (import.meta.env.PROD && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js", { scope: "./" })
        .catch((error) => console.warn("Service worker non enregistré :", error));
    });
  }

  syncInstallButtons();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    syncInstallButtons();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    syncInstallButtons();
    toastFn("CORPS est installé sur cet appareil", "ok");
  });

  window.matchMedia("(display-mode: standalone)").addEventListener?.("change", syncInstallButtons);

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-install]")) {
      event.preventDefault();
      promptInstall();
      return;
    }
    if (event.target.closest("[data-install-close]")) {
      closeHelp();
    }
  });

  const dialog = document.getElementById("install-help");
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const rightContent = document.getElementById("right-content");
  if (rightContent) {
    new MutationObserver(syncInstallButtons).observe(rightContent, {
      childList: true,
      subtree: true,
    });
  }
}

export async function promptInstall() {
  if (isStandalone()) {
    toastFn("CORPS est déjà installé sur cet appareil", "info");
    return;
  }

  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
    syncInstallButtons();
    if (choice.outcome === "accepted") {
      toastFn("Installation lancée", "ok");
    }
    return;
  }

  openHelp();
}

function openHelp() {
  const dialog = document.getElementById("install-help");
  const steps = document.getElementById("install-help-steps");
  const lead = document.getElementById("install-help-lead");
  if (!dialog || !steps) {
    toastFn("Utilisez le menu du navigateur pour installer cette page", "info");
    return;
  }

  const ios = isIOS();
  const android = isAndroid();

  lead.textContent = ios
    ? "Sur iPhone ou iPad, l'installation se fait depuis Safari, en quelques gestes."
    : android
      ? "Sur Android, Chrome peut installer CORPS comme une application."
      : "Sur ordinateur, Chrome ou Edge peuvent installer CORPS dans une fenêtre dédiée.";

  const list = ios
    ? [
        "Ouvrez cette page dans Safari.",
        "Appuyez sur le bouton Partager (carré avec une flèche).",
        "Choisissez « Sur l'écran d'accueil ».",
        "Appuyez sur « Ajouter » pour confirmer.",
      ]
    : android
      ? [
          "Ouvrez le menu ⋮ de Chrome.",
          "Choisissez « Installer l'application » ou « Ajouter à l'écran d'accueil ».",
          "Confirmez l'installation.",
        ]
      : [
          "Cliquez sur l'icône d'installation dans la barre d'adresse de Chrome ou Edge.",
          "Ou ouvrez le menu ⋮ puis choisissez « Installer CORPS ».",
          "L'application s'ouvre ensuite dans sa propre fenêtre.",
        ];

  steps.innerHTML = list.map((step) => `<li>${step}</li>`).join("");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeHelp() {
  const dialog = document.getElementById("install-help");
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}
