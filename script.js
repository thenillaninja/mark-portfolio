const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const primaryNav = document.getElementById("primaryNav");

if (mobileMenuToggle && primaryNav) {
  const closeMobileMenu = () => {
    primaryNav.classList.remove("is-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");

    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMobileMenu();
    }
  });
}

const homeLogo = document.querySelector(".brand-logo");

if (homeLogo) {
  homeLogo.addEventListener("click", (event) => {
    event.preventDefault();

    history.replaceState(null, "", window.location.pathname);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
}

/* Hero Business Dojo demo */
const demoSteps = document.querySelectorAll(".demo-step");
const demoMemory = document.getElementById("demoMemory");

if (demoSteps.length && demoMemory) {
  let demoIndex = 0;

  const runDemoStep = () => {
    demoSteps.forEach((step, index) => {
      step.classList.toggle("is-active", index === demoIndex);
    });

    if (demoIndex === demoSteps.length - 1) {
      demoMemory.classList.add("is-updated");
      demoMemory.lastElementChild.textContent = "Dojo Mind updated";
    } else {
      demoMemory.classList.remove("is-updated");
      demoMemory.lastElementChild.textContent = "Dojo Mind ready";
    }

    demoIndex = (demoIndex + 1) % demoSteps.length;
  };

  window.setInterval(runDemoStep, 1800);
}

/* Always start at the top on a full page load */
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });
});

/* Private beta invitation */
const betaModal = document.getElementById("betaModal");
const betaModalClose = document.getElementById("betaModalClose");
const betaModalDismiss = document.getElementById("betaModalDismiss");

if (betaModal && betaModalClose && betaModalDismiss) {
  const storageKey = "nillaninja-beta-modal-dismissed";
  let betaModalShown = false;

  const hasDismissedBetaModal = () => {
    try {
      return window.localStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  };

  const showBetaModal = () => {
    if (betaModalShown || hasDismissedBetaModal()) {
      return;
    }

    betaModalShown = true;
    betaModal.classList.add("is-visible");
    betaModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("beta-modal-open");

    window.setTimeout(() => {
      betaModalClose.focus();
    }, 50);
  };

  const closeBetaModal = ({ remember = true } = {}) => {
    betaModal.classList.remove("is-visible");
    betaModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("beta-modal-open");

    if (remember) {
      try {
        window.localStorage.setItem(storageKey, "true");
      } catch {
        // The modal can still close normally if storage is unavailable.
      }
    }

    window.removeEventListener("scroll", handleBetaScroll);
  };

  const handleBetaScroll = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
      return;
    }

    const scrollProgress = window.scrollY / scrollableHeight;

    if (scrollProgress >= 0.6) {
      showBetaModal();
      window.removeEventListener("scroll", handleBetaScroll);
    }
  };

  if (!hasDismissedBetaModal()) {
    window.setTimeout(showBetaModal, 25000);
    window.addEventListener("scroll", handleBetaScroll, { passive: true });
  }

  betaModalClose.addEventListener("click", () => {
    closeBetaModal();
  });

  betaModalDismiss.addEventListener("click", () => {
    closeBetaModal();
  });

  betaModal.addEventListener("click", (event) => {
    if (event.target === betaModal) {
      closeBetaModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      betaModal.classList.contains("is-visible")
    ) {
      closeBetaModal();
    }
  });
}
