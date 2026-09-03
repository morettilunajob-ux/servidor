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
