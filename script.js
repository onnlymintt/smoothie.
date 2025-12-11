// 1. SETUP CURSOR (Theo dõi chuột)
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    cursorBlur.animate({
        left: e.clientX + "px",
        top: e.clientY + "px"
    }, { duration: 500, fill: "forwards" });
});

// 2. TOGGLE DIMENSION (Chuyển đổi Reality vs Wonderland)
function toggleDimension() {
    const body = document.body;
    body.classList.toggle('wonderland-mode');
    body.classList.toggle('reality-mode');
    
    // Đổi Title Text
    const title = document.querySelector('.glitch-title');
    if(body.classList.contains('reality-mode')) {
        title.innerText = "MINH THY_DATA";
        title.style.fontFamily = "'JetBrains Mono', monospace";
    } else {
        title.innerText = "Portfoliracle";
        title.style.fontFamily = "'Pinyon Script', cursive";
    }
}

// 3. DRINK ME EFFECT (Zoom in/out trang web)
let isShrunk = false;
function drinkMeEffect() {
    const main = document.querySelector('main');
    if (!isShrunk) {
        main.style.transform = "scale(0.8) rotate(-2deg)";
        main.style.transition = "1s ease";
        alert("Oh dear! You're shrinking!");
        isShrunk = true;
    } else {
        main.style.transform = "scale(1) rotate(0deg)";
        isShrunk = false;
    }
}

// 4. SCROLL HELPER
function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 5. PARALLAX EFFECT (Hiệu ứng chiều sâu khi di chuột)
document.addEventListener("mousemove", parallax);
function parallax(e) {
    // Chỉ chạy ở Wonderland mode
    if(document.body.classList.contains('wonderland-mode')) {
        document.querySelectorAll(".floating-words span").forEach(function(move){
            var moving_value = move.getAttribute("data-value") || 5; // Default speed
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;
            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
}
