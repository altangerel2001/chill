document.addEventListener("DOMContentLoaded", () => {
  const moon = document.getElementById("moon");
  const phases = [
    "new-moon",
    "crescent-moon",
    "half-moon",
    "gibbous-moon",
    "full-moon"
  ];
  let currentPhase = 0;

  // make sure initial phase class is applied
  moon.classList.add(phases[currentPhase]);

  moon.addEventListener("click", () => {
    // short spin effect on click
    moon.classList.remove(phases[currentPhase]);
    currentPhase = (currentPhase + 1) % phases.length;
    moon.classList.add(phases[currentPhase]);

    // add quick spin class then remove after 900ms
    moon.classList.add("spin");
    setTimeout(() => moon.classList.remove("spin"), 900);
  });

  // accessibility: support Enter/Space to toggle phase
  moon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      moon.click();
    }
  });

  // Generate stars more efficiently
  const starsContainer = document.querySelector(".stars");
  const numStars = 2500; // performance-friendly default. increase if you want.
  const frag = document.createDocumentFragment();

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    // random size for variety
    const size = Math.random() * 2 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 5 + 2}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    frag.appendChild(star);
  }
  starsContainer.appendChild(frag);

  // Generate moving stars
  const movingStarsContainer = document.querySelector(".moving-stars");
  const numMovingStars = 20;

  for (let i = 0; i < numMovingStars; i++) {
    const movingStar = document.createElement("div");
    movingStar.classList.add("moving-star");
    movingStar.style.top = `${Math.random() * 100}vh`;
    // start left slightly negative so they move across screen nicely
    movingStar.style.left = `${Math.random() * 120 - 10}vw`;
    // durations between 8s and 25s
    movingStar.style.animationDuration = `${Math.random() * 17 + 8}s`;
    movingStarsContainer.appendChild(movingStar);
  }
});
