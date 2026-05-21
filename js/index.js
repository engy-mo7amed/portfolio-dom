let navLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("section[id]");
let menuBtn = document.getElementById("menu-toggle");
let menuNavLinks = document.querySelector(".nav-links");

//////////////// Display Navbar Active ////////////////////

function setActiveLink(clickedLink) {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
  clickedLink.classList.add("active");
}
if (navLinks[0]) {
  setActiveLink(navLinks[0]);
}
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    setActiveLink(e.target);
    menuNavLinks.classList.remove("show");
  });
}

const observer = new IntersectionObserver(
  function (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        const id = entries[i].target.id;
        const matchingLink = document.querySelector(
          '.nav-links a[href="#' + id + '"]',
        );
        if (matchingLink) {
          setActiveLink(matchingLink);
        }
      }
    }
  },
  {
    threshold: 0.2,
    rootMargin: "-80px 0px 0px 0px",
  },
);

for (let i = 0; i < sections.length; i++) {
  observer.observe(sections[i]);
}

menuBtn.addEventListener("click", function () {
  menuNavLinks.classList.toggle("show");
});
/////////////// change dark mode //////////////////

const themeToggleButton = document.getElementById("theme-toggle-button");
const html = document.documentElement;

themeToggleButton.addEventListener("click", function () {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    themeToggleButton.setAttribute("aria-pressed", "false");
  } else {
    html.classList.add("dark");
    themeToggleButton.setAttribute("aria-pressed", "true");
  }
});

////////////////// portfolio filter //////////////////
function initPortfolioFilter() {
  let filterButtons = document.querySelectorAll(".portfolio-filter");
  let portfolioItems = document.querySelectorAll(".portfolio-item");
  let filterValue, itemCategory;

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
        filterButtons[j].setAttribute("aria-pressed", "false");
        filterButtons[j].classList.remove(
          "bg-linear-to-r",
          "from-primary",
          "to-secondary",
          "text-white",
        );
        filterButtons[j].classList.add(
          "bg-white",
          "dark:bg-slate-800",
          "text-slate-600",
          "dark:text-slate-300",
        );
      }

      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");
      this.classList.add(
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

      filterValue = this.getAttribute("data-filter");

      for (let j = 0; j < portfolioItems.length; j++) {
        itemCategory = portfolioItems[j].getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          portfolioItems[j].style.display = "";
        } else {
          portfolioItems[j].style.display = "none";
        }
      }
    });
  }
}
initPortfolioFilter();

///////////////////// Testimonials Carousel////////////////////////

let carousel = document.getElementById("testimonials-carousel");
let cards = document.querySelectorAll(".testimonial-card");
let indicators = document.querySelectorAll(".carousel-indicator");
let nextBtn = document.getElementById("next-testimonial");
let prevBtn = document.getElementById("prev-testimonial");

let currentIndex = 0;

function getVisibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function getMaxIndex() {
  return cards.length - getVisibleCount();
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;

  for (let i = 0; i < indicators.length; i++) {
    const isActive = i === currentIndex;
    indicators[i].classList.toggle("bg-accent", isActive);
    indicators[i].classList.toggle("w-6", isActive);
    indicators[i].classList.toggle("bg-slate-400", !isActive);
    indicators[i].classList.toggle("dark:bg-slate-600", !isActive);
    indicators[i].setAttribute("aria-selected", isActive);
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
  updateCarousel();
});

for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", () => {
    currentIndex = Math.min(i, getMaxIndex());
    updateCarousel();
  });
}

window.addEventListener("resize", () => {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  updateCarousel();
});

updateCarousel();

////////////////// Contact Form Validation //////////////////

let sendBtn = document.getElementById("send-btn");

let fullName = document.getElementById("full-name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let projectDetails = document.getElementById("project-details");

let fullNameError = document.getElementById("full-name-error");
let emailError = document.getElementById("email-error");
let phoneError = document.getElementById("phone-error");
let projectDetailsError = document.getElementById("project-details-error");

sendBtn.addEventListener("click", function () {
  if (fullName.value.trim() === "") {
    fullNameError.classList.remove("hidden");
  }

  if (email.value.trim() === "") {
    emailError.classList.remove("hidden");
  }

  if (phone.value.trim() === "") {
    phoneError.classList.remove("hidden");
  }

  if (projectDetails.value.trim() === "") {
    projectDetailsError.classList.remove("hidden");
  }
});
fullName.addEventListener("input", function () {
  if (fullName.value.trim() !== "") {
    fullNameError.classList.add("hidden");
  }
});

email.addEventListener("input", function () {
  if (email.value.trim() !== "") {
    emailError.classList.add("hidden");
  }
});

phone.addEventListener("input", function () {
  if (phone.value.trim() !== "") {
    phoneError.classList.add("hidden");
  }
});

projectDetails.addEventListener("input", function () {
  if (projectDetails.value.trim() !== "") {
    projectDetailsError.classList.add("hidden");
  }
});

let customSelects = document.querySelectorAll(".custom-select");

for (let i = 0; i < customSelects.length; i++) {
  customSelects[i].addEventListener("click", function () {
    let options = this.nextElementSibling;
    options.classList.toggle("hidden");

    let icon = this.querySelector("i");
    icon.classList.toggle("rotate-180");
  });
}

document.addEventListener("click", function (e) {
  for (let i = 0; i < customSelects.length; i++) {
    if (!customSelects[i].contains(e.target)) {
      customSelects[i].nextElementSibling.classList.add("hidden");
      customSelects[i].querySelector("i").classList.remove("rotate-180");
    }
  }
});

let customOptions = document.querySelectorAll(".custom-option");

for (let i = 0; i < customOptions.length; i++) {
  customOptions[i].addEventListener("click", function () {
    let value = this.getAttribute("data-value");
    let wrapper = this.closest(".custom-select-wrapper");
    let select = wrapper.querySelector(".custom-select");
    let selectedText = select.querySelector(".selected-text");

    selectedText.textContent = value;
    selectedText.classList.remove("text-slate-500", "dark:text-slate-400");

    wrapper.querySelector(".custom-options").classList.add("hidden");
    select.querySelector("i").classList.remove("rotate-180");
  });
}

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
