const pages = [
  { id: "home", href: "index.html", label: "Home :)" },
  { id: "project", href: "project.html", label: "Project" },
  { id: "assignment", href: "assignment.html", label: "Assignment" },
  { id: "about", href: "about.html", label: "About Me" },
];

const currentPage = document.body.dataset.page || "home";
const primaryPages = pages.filter((page) => page.id !== "home" && page.id !== "about");
const homePage = pages.find((page) => page.id === "home");
const aboutPage = pages.find((page) => page.id === "about");
const navContainer = document.querySelector("[data-site-nav]");

if (navContainer) {
  navContainer.innerHTML = `
    <div class="site-nav__inner">
      <a
        class="nav-home${currentPage === homePage.id ? " is-active" : ""}"
        href="${homePage.href}"
        ${currentPage === homePage.id ? 'aria-current="page"' : ""}
      >
        ${homePage.label}
      </a>
      <nav class="nav-main" aria-label="Main navigation">
        ${primaryPages
          .map(
            (page) => `
              <a
                class="nav-link${currentPage === page.id ? " is-active" : ""}"
                href="${page.href}"
                ${currentPage === page.id ? 'aria-current="page"' : ""}
              >
                ${page.label}
              </a>
            `,
          )
          .join("")}
      </nav>
      <a
        class="nav-about${currentPage === aboutPage.id ? " is-active" : ""}"
        href="${aboutPage.href}"
        ${currentPage === aboutPage.id ? 'aria-current="page"' : ""}
      >
        ${aboutPage.label}
      </a>
    </div>
  `;
}

const presentationSlides = [...document.querySelectorAll(".presentation-slide")];
const slideCounter = document.querySelector("[data-slide-counter]");
const previousSlideButton = document.querySelector("[data-slide-prev]");
const nextSlideButton = document.querySelector("[data-slide-next]");
let currentSlide = 0;

const showSlide = (index) => {
  if (!presentationSlides.length) return;

  currentSlide = (index + presentationSlides.length) % presentationSlides.length;
  presentationSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  if (slideCounter) {
    slideCounter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(
      presentationSlides.length,
    ).padStart(2, "0")}`;
  }
};

previousSlideButton?.addEventListener("click", () => showSlide(currentSlide - 1));
nextSlideButton?.addEventListener("click", () => showSlide(currentSlide + 1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
});

showSlide(0);
