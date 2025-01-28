document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.events-container');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const cards = document.querySelectorAll('.event-card');
    
    // คำนวณความกว้างของ card + gap
    const cardWidth = cards[0].offsetWidth + 20;
    let currentIndex = 0;
    const maxIndex = cards.length - Math.floor(container.offsetWidth / cardWidth);

    // Fade-in animation เมื่อโหลดหน้า
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // ฟังก์ชันเลื่อน Slider
    function slideCards(direction) {
        if (direction === 'next' && currentIndex < maxIndex) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        // เพิ่ม Animation Effect
        container.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // อัพเดทสถานะปุ่ม
        updateButtonStates();
    }

    // อัพเดทสถานะปุ่มเลื่อน
    function updateButtonStates() {
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        nextBtn.classList.toggle('disabled', currentIndex === maxIndex);

        // เพิ่ม Animation Effect สำหรับปุ่ม
        if (currentIndex === 0) {
            prevBtn.style.transform = 'scale(0.95)';
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.style.transform = 'scale(1)';
            prevBtn.style.opacity = '1';
        }

        if (currentIndex === maxIndex) {
            nextBtn.style.transform = 'scale(0.95)';
            nextBtn.style.opacity = '0.5';
        } else {
            nextBtn.style.transform = 'scale(1)';
            nextBtn.style.opacity = '1';
        }
    }

    // Event Listeners สำหรับปุ่มเลื่อน
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            slideCards('prev');
            addButtonClickEffect(prevBtn);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            slideCards('next');
            addButtonClickEffect(nextBtn);
        }
    });

    // เพิ่ม Effect เมื่อกดปุ่ม
    function addButtonClickEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    // Touch Slider ที่สมูทขึ้น
    let startX;
    let scrollLeft;
    let isDown = false;
    let velocity = 0;
    let rafId;

    container.addEventListener('mousedown', e => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(rafId);
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        // เพิ่ม Momentum Scrolling
        const momentumScroll = () => {
            if (Math.abs(velocity) > 0.1) {
                container.scrollLeft += velocity;
                velocity *= 0.95;
                rafId = requestAnimationFrame(momentumScroll);
            }
        };
        momentumScroll();
    });

    container.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        const prevScrollLeft = container.scrollLeft;
        container.scrollLeft = scrollLeft - walk;
        velocity = container.scrollLeft - prevScrollLeft;
    });

    // Hover effects สำหรับการ์ด
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // ทำให้การ์ดที่ hover มีการเคลื่อนไหว
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';

            // ทำให้รูปภาพขยายเล็กน้อย
            const image = card.querySelector('.event-image');
            if (image) {
                image.style.transition = 'transform 0.4s ease';
                image.style.transform = 'scale(1.05)';
            }

            // เพิ่มการเคลื่อนไหวให้กับปุ่มรายละเอียด
            const detailsBtn = card.querySelector('.event-details');
            if (detailsBtn) {
                detailsBtn.style.color = '#a88c4c';
                const arrow = detailsBtn.querySelector('i');
                if (arrow) {
                    arrow.style.transform = 'translateX(8px)';
                }
            }

            // เพิ่มการเคลื่อนไหวให้กับวันที่
            const dateBox = card.querySelector('.event-date');
            if (dateBox) {
                dateBox.style.transform = 'scale(1.05)';
                dateBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            // คืนค่าทุกอย่างกลับสู่ปกติ
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';

            const image = card.querySelector('.event-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }

            const detailsBtn = card.querySelector('.event-details');
            if (detailsBtn) {
                detailsBtn.style.color = '#c4a45f';
                const arrow = detailsBtn.querySelector('i');
                if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                }
            }

            const dateBox = card.querySelector('.event-date');
            if (dateBox) {
                dateBox.style.transform = 'scale(1)';
                dateBox.style.boxShadow = 'none';
            }
        });
    });

    // เพิ่ม transition properties ใน CSS
    cards.forEach(card => {
        const elements = card.querySelectorAll('.event-image, .event-date, .event-details, i');
        elements.forEach(element => {
            element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Animation สำหรับปุ่ม "รายละเอียด"
    const detailButtons = document.querySelectorAll('.event-details');
    detailButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const arrow = button.querySelector('i');
            if (arrow) {
                arrow.style.transition = 'transform 0.3s ease';
                arrow.style.transform = 'translateX(5px)';
            }
        });

        button.addEventListener('mouseleave', () => {
            const arrow = button.querySelector('i');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
        });
    });

    // Intersection Observer สำหรับ scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Auto Slide with Smooth Transition
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                slideCards('next');
            } else {
                // Reset to start with smooth transition
                currentIndex = -1;
                container.style.transition = 'none';
                container.style.transform = 'translateX(0)';
                setTimeout(() => {
                    slideCards('next');
                }, 50);
            }
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // Initial button states
    updateButtonStates();
}); 