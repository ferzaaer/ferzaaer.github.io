// Hafta 7 - Bootstrap ile Başvuru Sistemi JavaScript

// ============================================
// 1. TEMA DEĞİŞTİRME FUNCTIONALITY
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Sayfayı yüklerken tema tercihini kontrol et
document.addEventListener('DOMContentLoaded', function () {
    // Local storage'dan tema tercihini oku
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Tema';
    }

    // Tema değiştirme butonu
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        // Tema tercihini kaydet
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️ Tema';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙 Tema';
        }
    });
});

// ============================================
// 2. FORM DOĞRULAMA VE GÖNDERİMİ
// ============================================

const registrationForm = document.getElementById('registrationForm');
const resultSection = document.getElementById('resultSection');
const newRegistrationBtn = document.getElementById('newRegistration');

// Form submit event listener
registrationForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfayı yenilememeyi sağla

    // Form doğrulaması
    if (!validateForm()) {
        return;
    }

    // Başarılı ise özeti göster
    showResultSummary();
});

// Form doğrulama fonksiyonu
function validateForm() {
    let isValid = true;

    // Temel alanları kontrol et
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const department = document.getElementById('department');
    const classSelect = document.getElementById('class');
    const prerequisite = document.getElementById('prerequisite');
    const participation = document.getElementById('participation');
    const terms = document.getElementById('terms');

    // Ad Soyadı
    if (!fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        isValid = false;
    } else {
        fullName.classList.remove('is-invalid');
    }

    // E-posta
    if (!email.value.trim() || !isValidEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Bölüm
    if (!department.value.trim()) {
        department.classList.add('is-invalid');
        isValid = false;
    } else {
        department.classList.remove('is-invalid');
    }

    // Sınıf
    if (!classSelect.value) {
        classSelect.classList.add('is-invalid');
        isValid = false;
    } else {
        classSelect.classList.remove('is-invalid');
    }

    // Ön Koşul
    if (!prerequisite.value) {
        prerequisite.classList.add('is-invalid');
        isValid = false;
    } else {
        prerequisite.classList.remove('is-invalid');
    }

    // Katılım Türü
    if (!participation.value) {
        participation.classList.add('is-invalid');
        isValid = false;
    } else {
        participation.classList.remove('is-invalid');
    }

    // Şartları Kabul Et
    if (!terms.checked) {
        terms.classList.add('is-invalid');
        isValid = false;
    } else {
        terms.classList.remove('is-invalid');
    }

    return isValid;
}

// E-posta doğrulama fonksiyonu
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// 3. BAŞVURU ÖZETI OLUŞTURMA
// ============================================

function showResultSummary() {
    // Form verilerini topla
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const classSelect = document.getElementById('class').value;
    const prerequisite = document.getElementById('prerequisite').value;
    const participation = document.getElementById('participation').value;
    const notes = document.getElementById('notes').value || 'Belirtilmedi';

    // Sonuç alanını güncelle
    document.getElementById('resultName').textContent = fullName;
    document.getElementById('resultEmail').textContent = email;
    document.getElementById('resultDepartment').textContent = department;
    document.getElementById('resultClass').textContent = classSelect;
    document.getElementById('resultPrerequisite').textContent = prerequisite;
    document.getElementById('resultParticipation').textContent = participation;
    document.getElementById('resultNotes').textContent = notes;

    // Formu gizle ve sonuç bölümünü göster
    registrationForm.style.display = 'none';
    resultSection.style.display = 'block';
    resultSection.classList.add('show');

    // Sonuç bölümüne scroll yap
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// 4. YENİ BAŞVURU YAPMA
// ============================================

newRegistrationBtn.addEventListener('click', function () {
    // Formu temizle
    registrationForm.reset();

    // Tüm input alanlarından is-invalid sınıfını kaldır
    const inputs = registrationForm.querySelectorAll('.is-invalid');
    inputs.forEach(input => input.classList.remove('is-invalid'));

    // Hata mesajlarını gizle
    const invalidFeedbacks = registrationForm.querySelectorAll('.invalid-feedback');
    invalidFeedbacks.forEach(feedback => feedback.style.display = 'none');

    // Formu göster ve sonuç bölümünü gizle
    registrationForm.style.display = 'block';
    resultSection.style.display = 'none';

    // Forma scroll yap
    registrationForm.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// 5. DİĞER İŞLEVLER
// ============================================

// "Koşu Temizle" butonu - cards bölümüne scroll
const scrollToCardsBtn = document.getElementById('scrollToCards');
if (scrollToCardsBtn) {
    scrollToCardsBtn.addEventListener('click', function () {
        const cardsSection = document.getElementById('atoyler');
        if (cardsSection) {
            cardsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// 6. ERIŞILEBILİLİK VE KULLANICILIK
// ============================================

// Enter tuşu ile form submit
registrationForm.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        registrationForm.dispatchEvent(new Event('submit'));
    }
});

// Console log - Development
console.log('Hafta 7 - Bootstrap + JavaScript Başvuru Sistemi Yüklenmiştir');
console.log('Tema Desteği: Açık ✓');
console.log('Form Doğrulaması: Aktif ✓');
console.log('Özet Oluşturma: Hazır ✓');
