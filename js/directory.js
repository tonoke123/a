document.addEventListener('DOMContentLoaded', function() {
    // Terminal Buttons
    const terminalBtns = document.querySelectorAll('.terminal-btn');
    terminalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('active')) {
                // Remove active class from all buttons
                terminalBtns.forEach(b => b.classList.remove('active'));
                
                // Add animation class
                btn.classList.add('btn-click-animation');
                btn.classList.add('active');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    btn.classList.remove('btn-click-animation');
                }, 300);

                // Trigger content update with fade effect
                updateContent(btn.textContent);
            }
        });
    });

    // Category Links
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            filterContent();
        });
    });

    // Subcategory Tags
    const subcategoryTags = document.querySelectorAll('.subcategory-tag');
    subcategoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            subcategoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterContent();
        });
    });

    // Shop Data
    const shops = [
        {
            id: 1,
            name: "ส้มตำนัว",
            terminal: "เทอร์มินอล 1",
            category: "อาหาร-เครื่องดื่ม",
            subcategory: "ร้านอาหาร",
            image: "/images/dine/previews/ส1.png",
            hours: "10:00-22:00",
            description: "ร้านส้มตำรสชาติจัดจ้าน สูตรต้นตำรับอีสาน พร้อมเมนูอีสานแท้มากมาย ทั้งลาบ น้ำตก ต้มแซ่บ",
            tags: ["อาหารอีสาน", "ส้มตำ", "อาหารไทย"]
        },
        {
            id: 2,
            name: "ข้าวมันไก่ป้าหมวย",
            terminal: "เทอร์มินอล 2",
            category: "อาหาร-เครื่องดื่ม",
            subcategory: "ร้านอาหาร",
            image: "/images/dine/previews/r1.jpg",
            hours: "06:00-20:00",
            description: "ข้าวมันไก่สูตรเด็ดพร้อมน้ำจิ้มรสเด็ด เสิร์ฟพร้อมซุปใส และไข่ต้ม รสชาติต้นตำรับสิงคโปร์",
            tags: ["อาหารจานเดียว", "ข้าวมันไก่", "อาหารเช้า"]
        },
        {
            id: 3,
            name: "ชาตรามือ",
            terminal: "เทอร์มินอล 3",
            category: "อาหาร-เครื่องดื่ม",
            subcategory: "คาเฟ่",
            image: "/images/dine/previews/sw1.jpg",
            hours: "24 ชั่วโมง",
            description: "ชาไทยสูตรต้นตำรับ พร้อมเครื่องดื่มสไตล์ไทยๆ ทั้งกาแฟโบราณ โกโก้ และนมสด",
            tags: ["ชา", "กาแฟ", "เครื่องดื่ม"]
        },
        {
            id: 4,
            name: "นารายณ์ภัณฑ์",
            terminal: "เทอร์มินอล 2",
            category: "ช้อปปิ้ง",
            subcategory: "ของฝาก",
            image: "/images/dine/previews/ber1.jpg",
            hours: "08:00-21:00",
            description: "ร้านของฝากคุณภาพ รวบรวมของดีจากทั่วไทย ทั้งขนม อาหารแห้ง และหัตถกรรม",
            tags: ["ของฝาก", "หัตถกรรม", "สินค้าไทย"]
        },
        {
            id: 5,
            name: "ธนาคารกสิกรไทย",
            terminal: "เทอร์มินอล 1",
            category: "บริการ",
            subcategory: "ธนาคาร",
            image: "/images/dine/previews/ธ5.png",
            hours: "07:00-22:00",
            description: "บริการแลกเปลี่ยนเงินตราต่างประเทศ และบริการทางการเงินครบวงจร",
            tags: ["แลกเงิน", "ธนาคาร", "บริการ"]
        },
        {
            id: 6,
            name: "จิม ทอมป์สัน",
            terminal: "เทอร์มินอล 4",
            category: "แฟชั่น",
            subcategory: "เสื้อผ้า",
            image: "/images/dine/previews/จ6.png",
            hours: "09:00-21:00",
            description: "ผ้าไหมไทยคุณภาพสูง พร้อมสินค้าแฟชั่นและของตกแต่งบ้านดีไซน์ไทยร่วมสมัย",
            tags: ["ผ้าไหม", "แฟชั่น", "ของตกแต่ง"]
        }
    ];

    function filterContent() {
        const activeTerminal = document.querySelector('.terminal-btn.active').dataset.terminal;
        const activeCategory = document.querySelector('.category-link.active').dataset.category;
        const activeSubcategory = document.querySelector('.subcategory-tag.active').dataset.subcategory;

        const filteredShops = shops.filter(shop => {
            const terminalMatch = activeTerminal === 'all' || shop.terminal === activeTerminal;
            const categoryMatch = activeCategory === 'all' || shop.category === activeCategory;
            const subcategoryMatch = activeSubcategory === 'all' || shop.subcategory === activeSubcategory;
            return terminalMatch && categoryMatch && subcategoryMatch;
        });

        displayShops(filteredShops);
    }

    function displayShops(filteredShops) {
        const shopGrid = document.querySelector('.shop-grid');
        shopGrid.style.opacity = '0';
        
        setTimeout(() => {
            if (filteredShops.length === 0) {
                shopGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>ไม่พบร้านค้าที่ตรงกับเงื่อนไขการค้นหา</p>
                    </div>
                `;
            } else {
                shopGrid.innerHTML = filteredShops.map(shop => `
                    <div class="shop-card">
                        <div class="shop-image-container">
                            <img src="${shop.image}" alt="${shop.name}" class="shop-image">
                        </div>
                        <div class="shop-info">
                            <h3>${shop.name}</h3>
                            <div class="shop-meta">
                                <span class="shop-hours">
                                    <i class="far fa-clock"></i> ${shop.hours}
                                </span>
                            </div>
                            <p class="shop-description">${shop.description}</p>
                            <div class="shop-tags">
                                ${shop.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            shopGrid.style.opacity = '1';
            initializeScrollIndicator();
        }, 300);
    }

    function updateContent(terminal) {
        const shopGrid = document.querySelector('.shop-grid');
        shopGrid.style.opacity = '0';
        
        setTimeout(() => {
            // Update content based on terminal
            filterShopsByTerminal(terminal);
            shopGrid.style.opacity = '1';
        }, 300);
    }

    // Initial display
    displayShops(shops);

    // Horizontal Scroll for Shop Grid
    const shopGrid = document.querySelector('.shop-grid');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    shopGrid.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - shopGrid.offsetLeft;
        scrollLeft = shopGrid.scrollLeft;
        shopGrid.style.cursor = 'grabbing';
    });

    shopGrid.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - shopGrid.offsetLeft;
        const walk = (x - startX) * 2;
        shopGrid.scrollLeft = scrollLeft - walk;
    });

    shopGrid.addEventListener('mouseup', () => {
        isScrolling = false;
        shopGrid.style.cursor = 'grab';
    });

    shopGrid.addEventListener('mouseleave', () => {
        isScrolling = false;
        shopGrid.style.cursor = 'grab';
    });

    // เพิ่มการจัดการ Info Icon tooltip
    const infoIcon = document.querySelector('.info-icon');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <i class="fas fa-search"></i>
            <span>ค้นหาร้านค้าและร้านอาหารทั้งหมดในสนามบิน</span>
        </div>
    `;

    infoIcon.addEventListener('mouseenter', () => {
        infoIcon.appendChild(tooltip);
        // จัดการตำแหน่ง tooltip
        const iconRect = infoIcon.getBoundingClientRect();
        tooltip.style.top = `${iconRect.height + 12}px`;
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
        tooltip.style.opacity = '1';
    });

    infoIcon.addEventListener('mouseleave', () => {
        if (tooltip.parentNode === infoIcon) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => {
                if (tooltip.parentNode === infoIcon) {
                    infoIcon.removeChild(tooltip);
                }
            }, 200);
        }
    });

    // เพิ่ม Lazy Loading สำหรับรูปภาพ
    const shopImages = document.querySelectorAll('.shop-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    shopImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Filter Functions
    function initializeFilters() {
        const terminalBtns = document.querySelectorAll('.terminal-btn');
        const categoryLinks = document.querySelectorAll('.category-link');
        const subcategoryTags = document.querySelectorAll('.subcategory-tag');

        // Terminal Buttons
        terminalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                terminalBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterShops();
            });
        });

        // Category Links
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                filterShops();
            });
        });

        // Subcategory Tags
        subcategoryTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                subcategoryTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                filterShops();
            });
        });
    }

    function filterShops() {
        const selectedTerminal = document.querySelector('.terminal-btn.active').textContent;
        const selectedCategory = document.querySelector('.category-link.active').textContent.toLowerCase();
        const selectedSubcategory = document.querySelector('.subcategory-tag.active').textContent.toLowerCase();

        const filteredShops = shops.filter(shop => {
            const terminalMatch = selectedTerminal === 'All' || shop.terminal === selectedTerminal;
            const categoryMatch = selectedCategory === 'all' || 
                                (selectedCategory === 'eat & drink' && shop.category === 'eat-drink') ||
                                shop.category === selectedCategory;
            const subcategoryMatch = selectedSubcategory === 'all' || 
                                   shop.subcategory === selectedSubcategory;

            return terminalMatch && categoryMatch && subcategoryMatch;
        });

        displayShops(filteredShops);
    }

    function initializeScrollIndicator() {
        const shopGrid = document.querySelector('.shop-grid');
        const scrollContainer = document.querySelector('.scroll-indicator') || document.createElement('div');
        scrollContainer.className = 'scroll-indicator';
        scrollContainer.innerHTML = '';
        
        const totalCards = document.querySelectorAll('.shop-card').length;
        const cardsPerPage = 4; // แสดงครั้งละ 4 ร้าน
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        
        // สร้างจุดตามจำนวนหน้า
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
            
            dot.addEventListener('click', () => {
                // ซ่อนร้านค้าทั้งหมด
                const allShops = document.querySelectorAll('.shop-card');
                allShops.forEach(shop => shop.style.display = 'none');
                
                // แสดงเฉพาะ 4 ร้านของหน้าที่เลือก
                const startIndex = i * cardsPerPage;
                for(let j = startIndex; j < startIndex + cardsPerPage && j < totalCards; j++) {
                    allShops[j].style.display = 'block';
                }
                
                // อัพเดทสถานะ active ของจุด
                document.querySelectorAll('.scroll-dot').forEach((d, index) => {
                    d.classList.toggle('active', index === i);
                });
            });
            
            scrollContainer.appendChild(dot);
        }
        
        if (!scrollContainer.parentNode) {
            shopGrid.parentNode.insertBefore(scrollContainer, shopGrid.nextSibling);
        }

        // แสดงหน้าแรกเมื่อโหลดครั้งแรก
        const firstPageShops = document.querySelectorAll('.shop-card');
        firstPageShops.forEach((shop, index) => {
            shop.style.display = index < cardsPerPage ? 'block' : 'none';
        });
    }

    // Add CSS for no results
    const style = document.createElement('style');
    style.textContent = `
        .no-results {
            text-align: center;
            padding: 40px;
            color: #64748b;
            width: 100%;
        }
        .no-results i {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
        }
        .no-results p {
            font-size: 16px;
            margin: 0;
        }
        .shop-meta {
            display: flex;
            gap: 16px;
            color: #64748b;
            font-size: 14px;
            margin: 8px 0;
        }
        .shop-meta i {
            margin-right: 4px;
        }
    `;
    document.head.appendChild(style);

    // Initialize filters
    initializeFilters();
    // Initial display of all shops
    displayShops(shops);
}); 