document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener("scroll", () => {
  const sections = [...document.querySelectorAll("section")];

  const currentScrollPosition = window.pageYOffset;
  const direction =
    currentScrollPosition > document.lastScrollPosition ? "down" : "up";

  if (document.onWayTo === null) {
    const destIndex =
      direction === "up"
        ? document.lastCentered - 1
        : document.lastCentered + 1;
    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;
      console.log({ destIndex, direction });
      window.scrollTo({
        top: sections[destIndex].offsetTop,
        behavior: "smooth",
      });
    }
  }

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;
    if (
      currentScrollPosition >= sectionTop &&
      currentScrollPosition < sectionBottom
    ) {
      document.lastCentered = index;
      if (document.onWayTo === index) {
        document.onWayTo = null;
      }
    }
  });

  document.lastScrollPosition = currentScrollPosition;
});
