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
