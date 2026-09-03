// 3D tilt on the hero glass card, following the pointer
const heroCard = document.getElementById('hero-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHover = window.matchMedia('(hover: hover)').matches;

if (heroCard && !prefersReducedMotion && supportsHover) {
  const maxTilt = 10;

  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `perspective(1200px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });
}
