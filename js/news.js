document.addEventListener('DOMContentLoaded', function() {
    // โหลดข้อมูลข่าวจากไฟล์ JSON
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            const newsGrid = document.querySelector('.news-grid');
            
            // สร้างข่าวเด่น
            const featuredNews = data.news.find(news => news.type === 'featured');
            if (featuredNews) {
                const featuredCard = document.createElement('article');
                featuredCard.className = 'news-card featured';
                featuredCard.innerHTML = `
                    <div class="news-image">
                        <img src="${featuredNews.image}" alt="${featuredNews.imageAlt}" loading="lazy">
                    </div>
                    <div class="news-content">
                        <h3>${featuredNews.title}</h3>
                        <div class="news-date">
                            <i class="far fa-calendar-alt"></i>
                            ${featuredNews.date}
                        </div>
                        <p class="news-excerpt">${featuredNews.excerpt}</p>
                        <a href="#" class="read-more">
                            อ่านเพิ่มเติม
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;
                newsGrid.appendChild(featuredCard);
            }

            // สร้าง container สำหรับข่าวย่อย
            const smallNewsGrid = document.createElement('div');
            smallNewsGrid.className = 'news-small-grid';

            // สร้างข่าวย่อย
            data.news.filter(news => news.type !== 'featured').forEach((news, index) => {
                const newsCard = document.createElement('article');
                newsCard.className = 'news-card';
                newsCard.style.opacity = '0';
                newsCard.style.transform = 'translateY(20px)';
                
                newsCard.innerHTML = `
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.imageAlt}" loading="lazy">
                    </div>
                    <div class="news-content">
                        <h3>${news.title}</h3>
                        <div class="news-date">
                            <i class="far fa-calendar-alt"></i>
                            ${news.date}
                        </div>
                        <p class="news-excerpt">${news.excerpt}</p>
                        <a href="#" class="read-more">
                            อ่านเพิ่มเติม
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;

                setTimeout(() => {
                    newsCard.style.transition = 'all 0.5s ease';
                    newsCard.style.opacity = '1';
                    newsCard.style.transform = 'translateY(0)';
                }, index * 100);

                smallNewsGrid.appendChild(newsCard);
            });

            newsGrid.appendChild(smallNewsGrid);
            
            // เพิ่ม animation effects
            addAnimationEffects();
        })
        .catch(error => console.error('Error loading news:', error));
});

function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = `news-card ${news.type || ''}`;
    
    card.innerHTML = `
        <div class="news-image">
            ${news.type === 'featured' ? '<span class="featured-tag">ข่าวเด่น</span>' : ''}
            <img src="${news.image}" alt="${news.imageAlt}">
        </div>
        <div class="news-content">
            <h3>${news.title}</h3>
            <p class="news-date">${news.date}</p>
            <p class="news-excerpt">${news.excerpt}</p>
            <a href="#" class="read-more">อ่านเพิ่มเติม <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return card;
}

function addAnimationEffects() {
    // Animate news cards on scroll
    const newsCards = document.querySelectorAll('.news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Read More hover effect
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.fa-arrow-right');
            arrow.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.fa-arrow-right');
            arrow.style.transform = 'translateX(0)';
        });
    });
} 