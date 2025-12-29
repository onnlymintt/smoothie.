/* =========================
   GLOBAL STATE
========================= */
let darkness = 0;
let falling = false;

/* =========================
   1. CURSOR = THOUGHT
========================= */
const cursor = document.createElement("div");
cursor.className = "cursor-thought";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* =========================
   2. TEXT WHISPER EFFECT
========================= */
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.style.letterSpacing = "0.15em";
    item.style.opacity = "0.85";
  });

  item.addEventListener("mouseleave", () => {
    item.style.letterSpacing = "0.02em";
    item.style.opacity = "1";
  });
});

/* =========================
   3. DELAYED MEANING
========================= */
document.querySelectorAll(".echo").forEach(echo => {
  echo.style.transitionDelay = "0.8s";
});

/* =========================
   4. BREATHING TYPO
========================= */
setInterval(() => {
  document.querySelectorAll(".project").forEach(p => {
    const weight = Math.random() > 0.5 ? 300 : 500;
    p.style.fontWeight = weight;
  });
}, 2000);

/* =========================
   5. SCROLL = RABBIT HOLE
========================= */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  darkness = Math.min(scrollY / 600, 1);

  document.body.style.backgroundColor =
    `rgba(0,0,0,${0.85 + darkness * 0.15})`;

  document.querySelector(".world").style.transform =
    `translateY(${-scrollY * 0.03}px)`;
});

/* =========================
   6. MEMORY GHOST
========================= */
let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (window.scrollY < lastScroll) {
    document.querySelectorAll(".item").forEach(item => {
      item.style.filter = "blur(1px)";
    });
  } else {
    document.querySelectorAll(".item").forEach(item => {
      item.style.filter = "none";
    });
  }
  lastScroll = window.scrollY;
});

/* =========================
   7. DOOR CLICK (FADE & FALL)
========================= */
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    if (falling) return;
    falling = true;

    document.body.style.transition = "background 1.2s ease";
    document.body.style.background = "black";

    document.querySelector(".world").style.transition =
      "transform 1.5s ease, opacity 1.5s ease";
    document.querySelector(".world").style.transform =
      "translateY(120vh)";
    document.querySelector(".world").style.opacity = "0";

    setTimeout(() => {
      // sau này em đổi thành link project
      alert("You chose a door. The story continues.");
      falling = false;
    }, 1600);
  });
});

/* =========================
   8. NAV UNSTABLE
========================= */
setInterval(() => {
  document.querySelectorAll(".nav span").forEach(n => {
    n.style.transform =
      `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
  });
}, 1200);

