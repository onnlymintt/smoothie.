// DATA PROJECTS (Cập nhật Gallery ở đây)
const projects = {
    'tedx': {
        title: "TEDxFTU 2025", role: "Content Leader",
        // THÊM NHIỀU ẢNH VÀO MẢNG NÀY
        gallery: [
            "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000"
        ],
        desc: "Lãnh đạo team Content xây dựng concept 'De Rubik Code'. Quản lý kịch bản, flow sân khấu và làm việc với diễn giả.",
        stats: ["✦ 221 Attendees", "✦ 4.6/5.0 CSAT", "✦ 90% Positive Feedback"]
    },
    'becday': {
        title: "BECDAY 2024", role: "Project Leader",
        gallery: [
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000"
        ],
        desc: "Sự kiện kết nối các thế hệ BECers. Sử dụng Gantt Chart và WBS để quản lý 20 thành viên trong 1 tháng.",
        stats: ["✦ 100+ Participants", "✦ 10+ Generations", "✦ Record Breaking"]
    },
    'h4tf': {
        title: "E-Commerce Strategy", role: "Champion 2024",
        gallery: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
        ],
        desc: "Chiến lược E-commerce toàn diện trong 96 giờ. Xây dựng workflow, phân chia task và pitching.",
        stats: ["✦ Champion Title", "✦ Top 50 Teams", "✦ Best Pitch"]
    }
};

// 1. GSAP ANIMATIONS (HIỆU ỨNG CUỘN ĐẮT TIỀN)
gsap.registerPlugin(ScrollTrigger);

// Hiệu ứng Chapter I (Hero)
gsap.to(".floater", {
    scrollTrigger: {
        trigger: "#chap1",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: -200,
    rotate: 360
});

// Hiệu ứng Chapter II (Gương thần trôi lên)
gsap.from(".mirror-frame", {
    scrollTrigger: {
        trigger: "#chap2",
        start: "top center",
        end: "center center",
        scrub: 1
    },
    y: 100,
    opacity: 0
});

// Hiệu ứng Chapter IV (Card bay vào)
gsap.from(".tarot-card", {
    scrollTrigger: {
        trigger: "#chap4",
        start: "top 80%"
    },
    y: 100,
    opacity: 0,
    stagger: 0.2, // Bay lần lượt từng cái
    duration: 1,
    ease: "back.out(1.7)"
});

// 2. PROJECT PORTAL LOGIC
const portal = document.getElementById('portal');
const pGallery = document.getElementById('p-gallery');
const pTitle = document.getElementById('p-title');
const pRole = document.getElementById('p-role');
const pDesc = document.getElementById('p-desc');
const pStats = document.getElementById('p-stats');

function openPortal(id) {
    const data = projects[id];
    
    // Fill Text
    pTitle.innerText = data.title;
    pRole.innerText = data.role;
    pDesc.innerText = data.desc;
    pStats.innerHTML = data.stats.map(s => `<li>${s}</li>`).join('');

    // Fill Gallery (Tạo nhiều thẻ ảnh)
    pGallery.innerHTML = '';
    data.gallery.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        pGallery.appendChild(img);
    });

    // Animation mở Portal
    portal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // GSAP Animation cho nội dung Portal
    gsap.fromTo(".portal-content > *", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.3 }
    );
}

function closePortal() {
    portal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 3. CURSOR FOLLOWER
const cursorDot = document.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(cursorCircle, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

// 4. MUSIC PLAYER
const audio = document.getElementById("bg-audio");
const vinyl = document.querySelector(".vinyl-icon");
let isPlaying = false;

function toggleAudio() {
    if(isPlaying) {
        audio.pause();
        gsap.to(vinyl, { rotation: 0, duration: 0.5 });
    } else {
        audio.play();
        // Xoay đĩa vô tận
        gsap.to(vinyl, { rotation: 360, repeat: -1, duration: 3, ease: "linear" });
    }
    isPlaying = !isPlaying;
}

// LOADING SCREEN OFF
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    gsap.to(loader, { y: "-100%", duration: 1, ease: "power4.inOut", delay: 1 });
});
