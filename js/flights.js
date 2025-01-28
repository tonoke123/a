document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const tableTitle = document.querySelector('.table-title');
    const dateDropdownBtn = document.querySelector('.date-dropdown-btn');
    const dateDropdownMenu = document.querySelector('.date-dropdown-menu');
    const dateDropdownItems = document.querySelectorAll('.date-dropdown-item');
    const flightsTable = document.querySelector('.flights-table');
    const searchForm = document.querySelector('.search-input-wrapper');

    // ข้อมูลตัวอย่างสำหรับแต่ละแท็บ
    const flightData = {
        'ARRIVALS': [
            { time: '02:31', origin: 'Dubai', flight: 'EK835', airline: 'Emirates', baggage: 'A01', gate: '15A-B', status: 'LANDED' },
            { time: '02:50', origin: 'Sabiha Gokcen', flight: 'VF125', airline: 'AJet', baggage: 'A04', gate: '16A', status: 'LANDED' },
            { time: '03:15', origin: 'Doha', flight: 'QR836', airline: 'Qatar Airways', baggage: 'A02', gate: '17B', status: 'LANDED' },
            { time: '04:20', origin: 'Singapore', flight: 'SQ711', airline: 'Singapore Airlines', baggage: 'A05', gate: '18C', status: 'ON TIME' },
            { time: '05:45', origin: 'Hong Kong', flight: 'CX751', airline: 'Cathay Pacific', baggage: 'A03', gate: '19A', status: 'EARLY' }
        ],
        'DEPARTURES': [
            { time: '06:15', origin: 'London', flight: 'BA401', airline: 'British Airways', baggage: 'B03', gate: '12B', status: 'ON TIME' },
            { time: '07:20', origin: 'Paris', flight: 'AF212', airline: 'Air France', baggage: 'B05', gate: '14C', status: 'EARLY' },
            { time: '08:30', origin: 'Frankfurt', flight: 'LH773', airline: 'Lufthansa', baggage: 'B01', gate: '11A', status: 'ON TIME' },
            { time: '09:45', origin: 'Amsterdam', flight: 'KL842', airline: 'KLM', baggage: 'B04', gate: '13B', status: 'DELAYED' },
            { time: '10:15', origin: 'Tokyo', flight: 'JL708', airline: 'Japan Airlines', baggage: 'B02', gate: '15C', status: 'ON TIME' }
        ]
    };

    // จัดการการคลิกที่แท็บ
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // ลบ active class จากทุกแท็บ
            navItems.forEach(nav => nav.classList.remove('active'));
            // เพิ่ม active class ให้แท็บที่ถูกคลิก
            this.classList.add('active');
            
            // อัพเดทหัวข้อตาราง
            const text = this.querySelector('span').textContent;
            tableTitle.textContent = text.charAt(0) + text.slice(1).toLowerCase();
            
            // อัพเดทข้อมูลในตาราง
            updateFlightsTable(text);
        });
    });

    // จัดการ dropdown
    dateDropdownBtn.addEventListener('click', function() {
        dateDropdownMenu.classList.toggle('show');
    });

    dateDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            dateDropdownBtn.textContent = this.textContent;
            dateDropdownMenu.classList.remove('show');
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down';
            dateDropdownBtn.appendChild(icon);
        });
    });

    // ปิด dropdown เมื่อคลิกที่อื่น
    document.addEventListener('click', function(e) {
        if (!dateDropdownBtn.contains(e.target)) {
            dateDropdownMenu.classList.remove('show');
        }
    });

    function updateFlightsTable(type) {
        const flights = flightData[type] || [];
        let tableHTML = `
            <div class="table-header">
                <div>TIME</div>
                <div>ORIGIN</div>
                <div>FLIGHT NUMBER</div>
                <div>AIRLINE</div>
                <div>BAGGAGE</div>
                <div>GATE</div>
                <div>STATUS</div>
                <div>NOTIFY ME</div>
            </div>
            <div class="flight-rows">
        `;

        flights.forEach(flight => {
            tableHTML += `
                <div class="flight-row">
                    <div>${flight.time}</div>
                    <div>${flight.origin}</div>
                    <div>${flight.flight}</div>
                    <div>${flight.airline}</div>
                    <div>${flight.baggage}</div>
                    <div>${flight.gate}</div>
                    <div class="status ${flight.status.toLowerCase()}">${flight.status}</div>
                    <div><i class="fas fa-bell"></i></div>
                </div>
            `;
        });

        tableHTML += `</div>`;
        flightsTable.innerHTML = tableHTML;
    }

    // แสดงข้อมูล Arrivals เมื่อโหลดหน้าเว็บครั้งแรก
    updateFlightsTable('ARRIVALS');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // ป้องกันการ submit แบบปกติ
        const searchInput = this.querySelector('.search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // นำไปยังหน้า departures พร้อมค่าที่ค้นหา
            window.location.href = `/Flights?search=${encodeURIComponent(searchTerm)}`;
        }
    });
});
