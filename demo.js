const demoSnapshot = document.querySelector("#demoSnapshot");
const demoResult = document.querySelector("#demoResult");

const demoAreas = {
  priorities: {
    title: "Weekly priorities",
    focus:
      "The business may be spending energy without a consistently clear definition of what matters most right now.",
    recommendation: "Set three visible priorities for the week.",
    action:
      "Choose the three outcomes that matter most this week and keep them somewhere the people doing the work can easily see them.",
    why:
      "Clear priorities reduce competing work and make follow-through easier to evaluate."
  },

  processes: {
    title: "Repeatable processes",
    focus:
      "Important recurring work may depend too heavily on memory or individual habits.",
    recommendation: "Document one recurring workflow.",
    action:
      "Choose a task that happens every week and write down the simplest repeatable version of how it should be completed.",
    why:
      "A repeatable process reduces reinvention and creates a foundation that can be improved over time."
  },

  followthrough: {
    title: "Follow-through",
    focus:
      "Important work may be getting identified without a reliable path from decision to completion.",
    recommendation: "Give important work one owner and one next step.",
    action:
      "For the next important task, name who owns it and define the very next action required to move it forward.",
    why:
      "Ownership and a visible next step make it harder for important work to disappear between intention and execution."
  },

  visibility: {
    title: "Operational visibility",
    focus:
      "Problems may be becoming visible only after they have already turned into urgent work.",
    recommendation: "Create a short weekly problem check.",
    action:
      "Once a week, identify what is late, blocked, repeatedly failing, or likely to become urgent next.",
    why:
      "Earlier visibility gives the business more options and reduces the cost of constantly reacting."
  },

  learning: {
    title: "Business learning",
    focus:
      "Useful lessons may be getting lost after a project, decision, success, or failure is over.",
    recommendation: "Capture one lesson after meaningful work.",
    action:
      "When something important succeeds or fails, record what happened, what was learned, and what should be repeated or changed next time.",
    why:
      "Captured lessons allow future decisions to start with context instead of making the business relearn the same thing."
  }
};

demoSnapshot?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(demoSnapshot);
  const answers = [
    ["priorities", Number(formData.get("priorities"))],
    ["processes", Number(formData.get("processes"))],
    ["followthrough", Number(formData.get("followthrough"))],
    ["visibility", Number(formData.get("visibility"))],
    ["learning", Number(formData.get("learning"))]
  ];

  if (answers.some(([, value]) => !value)) {
    demoSnapshot.reportValidity();
    return;
  }

  const total = answers.reduce((sum, [, value]) => sum + value, 0);
  const score = Math.round((total / 25) * 100);

  const weakest = answers.reduce((lowest, current) =>
    current[1] < lowest[1] ? current : lowest
  );

  const area = demoAreas[weakest[0]];

  document.querySelector("#demoScore").textContent = score;
  document.querySelector("#demoFocusTitle").textContent = area.title;
  document.querySelector("#demoFocusText").textContent = area.focus;
  document.querySelector("#demoRecommendationTitle").textContent =
    area.recommendation;
  document.querySelector("#demoRecommendationText").textContent = area.action;
  document.querySelector("#demoRecommendationWhy").textContent = area.why;

  demoResult.hidden = false;

  demoResult.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
