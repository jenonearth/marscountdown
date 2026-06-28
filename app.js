const MARS_TARGET_DATE = "2028-11-01T00:00:00Z";

const SITE_CONTENT = {
  targetDisplay: "Late 2028",
  lastReviewed: "June 2026",
  lastUpdated: "June 2026",
  clockDisclaimer:
    "November 1, 2028 is a planning estimate, not a confirmed SpaceX launch date.",
  passedTargetMessage:
    "This planning estimate has passed. No confirmed SpaceX Mars launch date has been announced.",
  clockMeaning: [
    "SpaceX publicly states that Starship cargo flights to Mars start no earlier than 2028.",
    "No exact launch date has been announced.",
    "Important technical milestones remain before a Mars mission, including orbital refueling and long-duration mission readiness."
  ],
  missionStatus: [
    {
      label: "Starship flight testing",
      status: "Active",
      tone: "active"
    },
    {
      label: "Orbital propellant transfer / refueling",
      status: "Pending",
      tone: "pending"
    },
    {
      label: "Mars cargo opportunity",
      status: "No earlier than 2028",
      tone: "watch"
    },
    {
      label: "Human Mars mission",
      status: "No public date announced",
      tone: "unknown"
    }
  ],
  windowsExplainer:
    "Earth and Mars line up favorably for efficient interplanetary launches roughly every 26 months. This tracker uses a late-2028 proxy to visualize the earliest public planning window without implying that SpaceX has published a confirmed mission manifest.",
  footerDisclaimer:
    "Dates may change as SpaceX updates its plans. This site tracks public statements and planning windows, not an official launch schedule."
};

const countdownNodes = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
  seconds: document.querySelector('[data-countdown="seconds"]')
};

const targetDate = new Date(MARS_TARGET_DATE);

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = value;
  }
}

function renderStaticContent() {
  setText('[data-content="targetDisplay"]', SITE_CONTENT.targetDisplay);
  setText('[data-content="lastReviewed"]', SITE_CONTENT.lastReviewed);
  setText('[data-content="lastUpdated"]', SITE_CONTENT.lastUpdated);
  setText('[data-content="clockStatus"]', SITE_CONTENT.clockDisclaimer);
  setText('[data-content="windowsExplainer"]', SITE_CONTENT.windowsExplainer);
  setText('[data-content="footerDisclaimer"]', SITE_CONTENT.footerDisclaimer);

  const meaningList = document.querySelector('[data-list="clockMeaning"]');
  if (meaningList) {
    meaningList.innerHTML = SITE_CONTENT.clockMeaning.map((item) => `<li>${item}</li>`).join("");
  }

  const statusList = document.querySelector('[data-list="missionStatus"]');
  if (statusList) {
    statusList.innerHTML = SITE_CONTENT.missionStatus
      .map(
        (item) => `
          <article class="timeline-item" data-tone="${item.tone}">
            <span class="status-dot" aria-hidden="true"></span>
            <div>
              <h3>${item.label}</h3>
              <p>${item.status}</p>
            </div>
          </article>
        `
      )
      .join("");
  }
}

function pad(value, length = 2) {
  return String(value).padStart(length, "0");
}

function setCountdownValue(part, value) {
  if (countdownNodes[part]) {
    countdownNodes[part].textContent = value;
  }
}

function updateCountdown() {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (Number.isNaN(targetDate.getTime())) {
    setText('[data-content="clockStatus"]', "Target date is not configured correctly.");
    return;
  }

  if (difference <= 0) {
    setCountdownValue("days", "000");
    setCountdownValue("hours", "00");
    setCountdownValue("minutes", "00");
    setCountdownValue("seconds", "00");
    setText('[data-content="clockStatus"]', SITE_CONTENT.passedTargetMessage);
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownValue("days", pad(days, 3));
  setCountdownValue("hours", pad(hours));
  setCountdownValue("minutes", pad(minutes));
  setCountdownValue("seconds", pad(seconds));
  setText('[data-content="clockStatus"]', SITE_CONTENT.clockDisclaimer);
}

renderStaticContent();
updateCountdown();
window.setInterval(updateCountdown, 1000);
