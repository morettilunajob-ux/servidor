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

const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const log = document.getElementById('chat-log');

function appendMessage(text, sender) {
  const p = document.createElement('p');
  p.className = sender;
  p.textContent = text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  input.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    appendMessage(data.reply || data.error, 'bot');
  } catch (err) {
    appendMessage('Erro ao contatar o servidor.', 'bot');
  }
});
