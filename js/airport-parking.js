class AirportParking {
    constructor() {
        this.form = document.querySelector('.airport-parking__form');
        this.startDateInput = document.querySelector('.airport-parking__input[name="parkingStartDate"]');
        this.endDateInput = document.querySelector('.airport-parking__input[name="parkingEndDate"]');
        this.initializeForm();
    }

    initializeForm() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.setMinDates();
            this.addInputListeners();
        }
    }

    setMinDates() {
        const now = new Date();
        const formattedNow = now.toISOString().slice(0, 16);
        
        this.startDateInput.min = formattedNow;
        this.startDateInput.addEventListener('change', () => {
            this.endDateInput.min = this.startDateInput.value;
        });
    }

    addInputListeners() {
        [this.startDateInput, this.endDateInput].forEach(input => {
            input.addEventListener('change', () => this.validateDates());
        });
    }

    validateDates() {
        const startDate = new Date(this.startDateInput.value);
        const endDate = new Date(this.endDateInput.value);

        if (startDate >= endDate) {
            alert('วันที่รับรถต้องมากกว่าวันที่จอด');
            this.endDateInput.value = '';
            return false;
        }
        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateDates()) return;

        try {
            const bookingData = {
                startDate: this.startDateInput.value,
                endDate: this.endDateInput.value
            };

            await this.submitBooking(bookingData);
            
            alert('จองที่จอดรถเรียบร้อยแล้ว');
            this.form.reset();
            
        } catch (error) {
            alert('เกิดข้อผิดพลาด: ' + error.message);
        }
    }

    async submitBooking(data) {
        // จำลอง API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('ข้อมูลการจอง:', data);
                resolve({ success: true });
            }, 1000);
        });
    }
}

// เริ่มการทำงานเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    new AirportParking();
}); 