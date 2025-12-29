const cursor = document.createElement("div");
cursor.className = "cursor-thought";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    document.body.style.transition = "background 1.2s ease";
    document.body.style.background = "black";

    document.querySelector(".world").style.transition =
      "transform 1.5s ease, opacity 1.5s ease";
    document.querySelector(".world").style.transform =
      "translateY(120vh)";
    document.querySelector(".world").style.opacity = "0";
  });
});
