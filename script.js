// Dữ liệu dự án của Thy
// QUAN TRỌNG: Thay các đường link trong 'image' bằng link ảnh thật của bạn sau này.
const projects = [
    {
        title: "Concert Loyalty Analysis",
        desc: "Phân tích yếu tố ảnh hưởng lòng trung thành khách hàng sử dụng mô hình SEM và EFA.",
        // Ảnh placeholder màu hồng/nâu cho hợp theme
        image: "https://placehold.co/400x300/fcefee/8b5e3c?text=Data+Analysis+Chart"
    },
    {
        title: "RCEP Trade Impact",
        desc: "Nghiên cứu tác động của hiệp định RCEP đến thương mại Việt Nam.",
        image: "https://placehold.co/400x300/fcefee/8b5e3c?text=Research+Paper"
    },
    {
        title: "Social Media Listening",
        desc: "Phân tích xu hướng và phản hồi người dùng trên nền tảng mạng xã hội.",
        image: "https://placehold.co/400x300/fcefee/8b5e3c?text=Social+Trends"
    }
];

// Hàm load dự án vào HTML
function loadProjects() {
    const container = document.getElementById('projectContainer');
    
    projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${proj.image}" alt="${proj.title}" class="project-img">
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
        `;
        container.appendChild(card);
    });
}

// Xử lý cuộn trang khi bấm menu
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Chạy hàm load dự án khi web tải xong
document.addEventListener('DOMContentLoaded', loadProjects);
