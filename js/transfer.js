document.addEventListener("DOMContentLoaded", function() {
    // Apply hover and click effects to the three new info boxes
    const cards = document.querySelectorAll('.info-box');
    const defaultHoverSrc = 'no-image.jpg'; // Default "no image" source

    cards.forEach(card => {
        const img = card.querySelector('img');
        const originalSrc = img.src;
        const icons = card.querySelectorAll('.grid div i');

        icons.forEach(icon => {
            const iconHoverSrc = icon.getAttribute('data-hover') || defaultHoverSrc;

            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'rotateY(180deg)';
                img.src = iconHoverSrc;
            });

            icon.addEventListener('mouseout', () => {
                icon.style.transform = 'rotateY(0deg)';
                img.src = originalSrc;
            });

            icon.addEventListener('click', (e) => {
                e.preventDefault();
                icon.classList.add('zoom-rotate', 'icon-rotate');
                setTimeout(() => {
                    window.location.href = icon.parentElement.href;
                }, 1000); // Adjust the delay to match the slower animation
            });
        });

        img.addEventListener('mouseover', () => {
            img.src = img.getAttribute('data-hover') || defaultHoverSrc;
        });

        img.addEventListener('mouseout', () => {
            img.src = originalSrc;
        });

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Fade-in animation for elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200); // Stagger the animation by 200ms
    });
});
