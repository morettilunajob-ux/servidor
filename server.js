const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder — o provedor de IA (Claude, OpenAI, etc.) ainda será definido.
app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Campo "message" é obrigatório.' });
  }
  res.json({ reply: 'Assistente de IA ainda não configurado.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
