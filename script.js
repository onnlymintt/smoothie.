// DATA DỰ ÁN
const projects = {
    'tedx': {
        title: "TEDxFTU 2025", role: "Content Leader",
        image: "https://images.unsplash.com/photo-1475721027767-4d09602e5b87?q=80&w=1000",
        desc: "Lãnh đạo team Content xây dựng concept 'De Rubik Code'. Quản lý kịch bản, flow sân khấu và làm việc với diễn giả.",
        stats: ["✦ 221 Attendees", "✦ 4.6/5.0 CSAT", "✦ 90% Positive Feedback"]
    },
    'becday': {
        title: "BECDAY 2024", role: "Project Leader",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000",
        desc: "Sự kiện kết nối các thế hệ BECers. Sử dụng Gantt Chart và WBS để quản lý 20 thành viên trong 1 tháng.",
        stats: ["✦ 100+ Participants", "✦ 10+ Generations", "✦ Record Breaking"]
    },
    'h4tf': {
        title: "E-Commerce Strategy", role: "Champion 2024",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000",
        desc: "Chiến lược E-commerce toàn diện trong 96 giờ. Xây dựng workflow, phân chia task và pitching.",
        stats: ["✦ Champion Title", "✦ Top 50 Teams", "✦ Best Pitch"]
    }
};

// 1. MUSIC CONTROL (Bật/Tắt nhạc)
const audio = document.getElementById("bg-music");
const gramophone = document.querySelector(".gramophone-widget");
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        gramophone.classList.remove("playing");
        document.querySelector(".music-tooltip").innerText = "Play Wonderland";
    } else {
        audio.play();
        gramophone.classList.add("playing");
        document.querySelector(".music-tooltip").innerText = "Pause Music";
    }
    isPlaying = !isPlaying;
}

// 2. CLICK EFFECT (Hiệu ứng nổ khi click)
document.addEventListener('click', (e) => {
    // Tạo phần tử đốm sáng
    const burst = document.createElement('div');
    burst.classList.add('burst');
    document.getElementById('click-effects').appendChild(burst);
    
    // Đặt vị trí ngay tại chuột
    burst.style.left = e.clientX + 'px';
    burst.style.top = e.clientY + 'px';
    
    // Xóa sau khi hiệu ứng xong
    setTimeout(() => {
        burst.remove();
    }, 800);
});

// 3. TYPEWRITER EFFECT (Chữ tự gõ)
const textToType = "\"Minh Thy was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do... until she found Data.\"";
const typeContainer = document.getElementById("type-text");
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typeContainer.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Tốc độ gõ
    }
}

// 4. SCROLL ANIMATION (Hiện Chapter & Kích hoạt gõ chữ)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.chapter-content').classList.add('visible');
            
            // Nếu là Chap 1 thì bắt đầu gõ chữ
            if(entry.target.id === 'chap1' && charIndex === 0) {
                typeWriter();
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.chapter').forEach(chap => observer.observe(chap));

// 5. PROJECT PORTAL LOGIC
const portal = document.getElementById('project-portal');
const pTitle = document.getElementById('portal-title');
const pRole = document.getElementById('portal-role');
const pImg = document.getElementById('portal-image');
const pDesc = document.getElementById('portal-desc');
const pStats = document.getElementById('portal-stats');

function openProject(id) {
    const data = projects[id];
    pTitle.innerText = data.title;
    pRole.innerText = data.role;
    pImg.src = data.image;
    pDesc.innerText = data.desc;
    pStats.innerHTML = data.stats.map(s => `<li>${s}</li>`).join('');
    
    portal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    portal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
