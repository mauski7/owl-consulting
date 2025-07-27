// Journey carousel arrow scroll functionality
// Scrolls one card at a time when arrow is clicked

document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.journey-grid');
  if (!grid) return;

  // Find a journey card to get its width
  const card = grid.querySelector('.journey-step, .journey-card');
  if (!card) return;

  const leftArrow = document.querySelector('.journey-arrow.left');
  const rightArrow = document.querySelector('.journey-arrow.right');

  function getCardScrollAmount() {
    // Use card's offsetWidth plus gap
    const style = window.getComputedStyle(grid);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', function() {
      grid.scrollBy({ left: -getCardScrollAmount(), behavior: 'smooth' });
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', function() {
      grid.scrollBy({ left: getCardScrollAmount(), behavior: 'smooth' });
    });
  }
});
