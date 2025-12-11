// Logic: Khi lướt chuột xuống, các phần tử sẽ từ từ hiện ra (Fade in)
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Dùng IntersectionObserver để bắt sự kiện lướt web
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Hiện 10% là bắt đầu hiệu ứng
    });

    // 2. Gắn camera quan sát vào tất cả phần tử có class 'fade-in'
    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));

    // 3. Hiệu ứng Parallax (Ảnh trôi chậm hơn chữ) - Optional Aesthetic
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        // Làm mờ Hero section khi cuộn xuống
        hero.style.opacity = 1 - (scrolled / 700);
    });
});
