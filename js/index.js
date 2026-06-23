const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const menuBtn = document.getElementById("menu-toggle");
const menuNavLinks = document.querySelector(".nav-links");

////////////////  Navbar Active ////////////////////

function setActiveLink(link) {
  navLinks.forEach((l) => l.classList.remove("active"));
  link.classList.add("active");
}
setActiveLink(navLinks[0]);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveLink(link);
    menuNavLinks.classList.remove("show");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`,
        );
        if (link) setActiveLink(link);
      }
    });
  },
  { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" },
);

sections.forEach((section) => observer.observe(section));

menuBtn.addEventListener("click", () => {
  menuNavLinks.classList.toggle("show");
});
/////////////// change dark mode //////////////////

const themeToggleButton = document.getElementById("theme-toggle-button");
const html = document.documentElement;

themeToggleButton.addEventListener("click", () => {
  html.classList.toggle("dark");
});

////////////////// nav-taps //////////////////

function PortfolioFilter() {
  const filterButtons = document.querySelectorAll(".portfolio-filter");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => {
        btn.classList.remove(
          "active",
          "bg-linear-to-r",
          "from-primary",
          "to-secondary",
          "text-white",
        );
        btn.classList.add(
          "bg-white",
          "dark:bg-slate-800",
          "text-slate-600",
          "dark:text-slate-300",
        );
        btn.setAttribute("aria-pressed", "false");
      });

      this.classList.add(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
      this.classList.remove(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
      );
      this.setAttribute("aria-pressed", "true");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

PortfolioFilter();

/////////////////////  Carousel////////////////////////
const carousel = document.getElementById("testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const indicators = document.querySelectorAll(".carousel-indicator");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
let currentIndex = 0;

const getVisibleCount = () => {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const getMaxIndex = () => cards.length - getVisibleCount();

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;

  indicators.forEach((indicator, i) => {
    const isActive = i === currentIndex;
    indicator.classList.toggle("bg-accent", isActive);
    indicator.classList.toggle("w-6", isActive);
    indicator.classList.toggle("bg-slate-400", !isActive);
    indicator.classList.toggle("dark:bg-slate-600", !isActive);
    indicator.setAttribute("aria-selected", isActive);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
  updateCarousel();
});

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    currentIndex = Math.min(i, getMaxIndex());
    updateCarousel();
  });
});

window.addEventListener("resize", () => {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  updateCarousel();
});

updateCarousel();

//////////////////  Validation form //////////////////

const sendBtn = document.getElementById("send-btn");
const fields = {
  fullName: {
    input: document.getElementById("full-name"),
    error: document.getElementById("full-name-error"),
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
  },
  phone: {
    input: document.getElementById("phone"),
    error: document.getElementById("phone-error"),
  },
  projectDetails: {
    input: document.getElementById("project-details"),
    error: document.getElementById("project-details-error"),
  },
};

sendBtn.addEventListener("click", () => {
  Object.values(fields).forEach(({ input, error }) => {
    if (input.value.trim() === "") {
      error.classList.remove("hidden");
    }
  });
});

Object.values(fields).forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      error.classList.add("hidden");
    }
  });
});

const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((select) => {
  select.addEventListener("click", function (e) {
    e.stopPropagation();
    this.nextElementSibling.classList.toggle("hidden");
    this.querySelector("i").classList.toggle("rotate-180");
  });
});

document.addEventListener("click", (e) => {
  customSelects.forEach((select) => {
    if (!select.contains(e.target)) {
      select.nextElementSibling.classList.add("hidden");
      select.querySelector("i").classList.remove("rotate-180");
    }
  });
});

document.querySelectorAll(".custom-option").forEach((option) => {
  option.addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    const wrapper = this.closest(".custom-select-wrapper");
    const select = wrapper.querySelector(".custom-select");
    const selectedText = select.querySelector(".selected-text");

    selectedText.textContent = value;
    selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
    wrapper.querySelector(".custom-options").classList.add("hidden");
    select.querySelector("i").classList.remove("rotate-180");
  });
});

/////////////// Scroll to Top Button //////////////////
let scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
    scrollToTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollToTopBtn.classList.remove("opacity-100", "visible");
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/////////////////// Settings Sidebar //////////////////////

let settingsToggle = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let closeSettings = document.getElementById("close-settings");

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.toggle("translate-x-full");
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
});

// Fonts

let fontOptions = document.querySelectorAll(".font-option");

for (let i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function () {
    let font = this.getAttribute("data-font");
    document.body.classList.remove(
      "font-tajawal",
      "font-cairo",
      "font-alexandria",
    );
    document.body.classList.add("font-" + font);

    for (let j = 0; j < fontOptions.length; j++) {
      fontOptions[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

// Theme Colors

let themeColors = [
  {
    name: "بنفسجي",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "برتقالي",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#fb923c",
  },
  { name: "أخضر", primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  {
    name: "سماوي",
    primary: "#06b6d4",
    secondary: "#0891b2",
    accent: "#22d3ee",
  },
  { name: "وردي", primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
  { name: "أحمر", primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" },
];

let colorsGrid = document.getElementById("theme-colors-grid");
let activeColorBtn = null;

for (let i = 0; i < themeColors.length; i++) {
  let btn = document.createElement("button");
  btn.type = "button";
  btn.title = themeColors[i].name;
  btn.style.cssText =
    "width: 100%; aspect-ratio: 1; border-radius: 12px; background: " +
    themeColors[i].primary +
    "; border: 3px solid transparent; transition: all 0.3s; cursor: pointer;";

  if (i === 0) {
    btn.style.borderColor = "white";
    activeColorBtn = btn;
  }

  btn.addEventListener("click", function () {
    let root = document.documentElement;
    root.style.setProperty("--color-primary", themeColors[i].primary);
    root.style.setProperty("--color-secondary", themeColors[i].secondary);
    root.style.setProperty("--color-accent", themeColors[i].accent);

    if (activeColorBtn) {
      activeColorBtn.style.borderColor = "transparent";
    }
    btn.style.borderColor = "white";
    activeColorBtn = btn;
  });

  colorsGrid.appendChild(btn);
}

// Reset Settings

let resetBtn = document.getElementById("reset-settings");

resetBtn.addEventListener("click", function () {
  let root = document.documentElement;
  root.style.setProperty("--color-primary", "#6366f1");
  root.style.setProperty("--color-secondary", "#8b5cf6");
  root.style.setProperty("--color-accent", "#a855f7");

  document.body.classList.remove(
    "font-tajawal",
    "font-cairo",
    "font-alexandria",
  );
  document.body.classList.add("font-tajawal");

  for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove("active");
    fontOptions[i].setAttribute("aria-checked", "false");
    if (fontOptions[i].getAttribute("data-font") === "tajawal") {
      fontOptions[i].classList.add("active");
      fontOptions[i].setAttribute("aria-checked", "true");
    }
  }

  if (activeColorBtn) {
    activeColorBtn.style.borderColor = "transparent";
  }
  colorsGrid.children[0].style.borderColor = "white";
  activeColorBtn = colorsGrid.children[0];
});
