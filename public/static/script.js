document.addEventListener('DOMContentLoaded', () => {
    // スライドショーの切り替え
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // 初期表示
    showSlides();
    setInterval(showSlides, 5000);

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 40,
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-center');
    const buttons = document.querySelector('.fixed-buttons');
    const triggerPoint = window.innerHeight * 0.2;  // 切り替えタイミング
    const mainSection = document.querySelector('main');

    if (window.scrollY >= mainSection.offsetTop - triggerPoint) {
        nav.classList.add('scrolled');
        buttons.classList.add('small');  // ボタンのテキストを非表示
    } else {
        nav.classList.remove('scrolled');
        buttons.classList.remove('small');  // ボタンのテキストを再表示
    }
});



  
  
  
  
