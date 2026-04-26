// Other Weeks Button Functionality
document.addEventListener('DOMContentLoaded', function () {
    const otherWeeksBtn = document.getElementById('otherWeeksBtn');

    if (otherWeeksBtn) {
        otherWeeksBtn.addEventListener('click', function () {
            // Scroll to weeks grid
            const weeksGrid = document.querySelector('.weeks-grid');
            if (weeksGrid) {
                weeksGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
