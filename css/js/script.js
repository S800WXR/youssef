document.addEventListener('DOMContentLoaded', function() {
    // تنشيط الروابط في القائمة
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // معالجة نموذج الحجز
    const appointmentForm = document.getElementById('appointmentForm');
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close');
    const printBtn = document.getElementById('printBtn');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(appointmentForm);
            const appointmentDetails = document.getElementById('appointmentDetails');
            
            // عرض تفاصيل الحجز
            appointmentDetails.innerHTML = `
                <p><strong>الاسم:</strong> ${formData.get('name')}</p>
                <p><strong>رقم الهاتف:</strong> ${formData.get('phone')}</p>
                <p><strong>البريد الإلكتروني:</strong> ${formData.get('email') || 'غير محدد'}</p>
                <p><strong>نوع الخدمة:</strong> ${formData.get('service')}</p>
                <p><strong>الطبيب:</strong> ${formData.get('doctor') || 'لا تفضيل'}</p>
                <p><strong>التاريخ:</strong> ${formData.get('date')}</p>
                <p><strong>الوقت:</strong> ${formData.get('time')}</p>
                <p><strong>ملاحظات:</strong> ${formData.get('notes') || 'لا يوجد'}</p>
            `;
            
            // عرض المودال
            modal.style.display = 'block';
            
            // مسح النموذج
            appointmentForm.reset();
        });
    }
    
    // إغلاق المودال
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // إغلاق المودال عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // زر الطباعة
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // تعطيل تواريخ الماضي في حقل التاريخ
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // تحميل الأوقات المتاحة بناءً على التاريخ المحدد
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            // هنا يمكنك إضافة منطق لجلب الأوقات المتاحة من الخادم
            console.log('تم اختيار تاريخ:', this.value);
        });
    }
    
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});