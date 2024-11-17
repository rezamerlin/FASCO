const allSection = document.querySelectorAll("section");
const calcSectionSlowmation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("anim-sec");
  observer.unobserve(entry.target);
};

const slowmationObserver = new IntersectionObserver(calcSectionSlowmation, {
  root: null,
  threshold: 0.13,
});

allSection.forEach((e) => {
  slowmationObserver.observe(e);
});