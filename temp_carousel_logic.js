
// ========================================
// Pricing Carousel Logic
// ========================================
function initPricingCarousel() {
    const track = document.getElementById('pricingTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.pricing-card');
    const totalCards = cards.length;

    // Function to update carousel position
    function updateCarousel() {
        // Calculate appropriate translation
        // On mobile, we might want to show Partial cards or 1 at a time.
        // On desktop, maybe we don't need carousel if they all fit?
        // User asked for carousel specifically.

        // Simple slide logic: 100% * index
        // But we need to account for gap.

        // Let's get the width of a card + gap
        const cardWidth = cards[0].offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 30;

        const moveAmount = (cardWidth + gap) * currentIndex;

        // Center the active card?
        // Or just slide left.

        // Let's do a simple slide for now.
        // We need to limit currentIndex.

        track.style.transform = `translateX(-${moveAmount}px)`;

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

        // Calculate visible items to disable next button correctly
        const containerWidth = track.parentElement.offsetWidth;
        const visibleItems = Math.floor(containerWidth / (cardWidth + gap));
        const maxIndex = Math.max(0, totalCards - 1);
        // Logic might be tricky depending on how many fit.
        // Let's just allow scrolling to the last one.

        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initial check
    updateCarousel();
}
