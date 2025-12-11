// DATA DỰ ÁN (Cập nhật để chứa MẢNG ẢNH - gallery)
const projects = {
    'tedx': {
        title: "TEDxFTU 2025",
        role: "Content Leader",
        // MẢNG ẢNH: Bạn điền bao nhiêu link ảnh vào đây cũng được
        gallery: [
            "https://images.unsplash.com/photo-1475721027767-4d09602e5b87?q=80&w=1000", // Ảnh 1 (Sân khấu)
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000", // Ảnh 2 (Teamwork)
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000"  // Ảnh 3 (Khán giả)
        ],
        desc: "Lãnh đạo team Content xây dựng concept 'De Rubik Code'. Quản lý kịch bản, flow sân khấu và làm việc với diễn giả.",
        stats: ["✦ 221 Attendees", "✦ 4.6/5.0 CSAT", "✦ 90% Positive Feedback"]
    },
    'becday': {
        title: "BECDAY 2024",
        role: "Project Leader",
        gallery: [
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000",
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000"
        ],
        desc: "Sự kiện kết nối các thế hệ BECers. Sử dụng Gantt Chart và WBS để quản lý 20 thành viên trong 1 tháng.",
        stats: ["✦ 100+ Participants", "✦ 10+ Generations", "✦ Record Breaking"]
    },
    'h4tf': {
        title: "E-Commerce Strategy",
        role: "Champion 2024",
        gallery: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
        ],
        desc: "Chiến lược E-commerce toàn diện trong 96 giờ. Xây dựng workflow, phân chia task và pitching.",
        stats: ["✦ Champion Title", "✦ Top 50 Teams", "✦ Best Pitch"]
    }
};

// 1. PRELOADER LOGIC (Tắt màn hình chờ sau 2s)
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);
});

// 2. CURSOR & PARALLAX
const cursor = document.getElementById("magic-cursor");
const trail = document.getElementById("magic-cursor-trail");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    trail.animate({ left: e.clientX + "px", top: e.clientY + "px" }, { duration: 500, fill: "forwards" });
    
    // Parallax Effect
    document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const speed = (index + 1) * 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// 3. PROJECT PORTAL LOGIC (HỖ TRỢ NHIỀU ẢNH)
const portal = document.getElementById('project-portal');
const pTitle = document.getElementById('p-title');
const pRole = document.getElementById('p-role');
const pGallery = document.getElementById('p-gallery'); // Chỗ chứa nhiều ảnh
const pDesc = document.getElementById('p-desc');
const pStats = document.getElementById('p-stats');

function openProject(id) {
    const data = projects[id];
    pTitle.innerText = data.title;
    pRole.innerText = data.role;
    pDesc.innerText = data.desc;
    pStats.innerHTML = data.stats.map(s => `<li>${s}</li>`).join('');

    // Xóa ảnh cũ
    pGallery.innerHTML = '';
    
    // Vòng lặp: Tạo nhiều thẻ <img> từ mảng gallery
    data.gallery.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        pGallery.appendChild(img);
    });

    portal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    portal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 4. MUSIC PLAYER
const audio = document.getElementById("bg-music");
const gramophone = document.querySelector(".gramophone-widget");
let isPlaying = false;
function toggleMusic() {
    if (isPlaying) { audio.pause(); gramophone.classList.remove("playing"); }
    else { audio.play(); gramophone.classList.add("playing"); }
    isPlaying = !isPlaying;
}
