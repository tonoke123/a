function toggleCard(card, extraId) {
    const extra = document.getElementById(extraId);

    // ตรวจสอบสถานะการแสดงผลของข้อมูลเพิ่มเติม
    if (extra.style.display === 'block') {
        // ถ้ากำลังแสดงอยู่ ให้ซ่อน
        extra.style.display = 'none';
        card.classList.remove('active'); 
    } else {
        // ถ้าไม่แสดง ให้ซ่อนข้อมูลเพิ่มเติมของการ์ดอื่น ๆ
        const allExtras = document.querySelectorAll('.card-extra');
        allExtras.forEach(extra => {
            extra.style.display = 'none';
        });

        // ลบคลาส active จากการ์ดทั้งหมด
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => {
            c.classList.remove('active');
        });

        // แสดงข้อมูลเพิ่มเติมของการ์ดที่ถูกคลิก
        extra.style.display = 'block';
        card.classList.add('active'); 
    }
} 