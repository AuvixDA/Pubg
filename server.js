const express = require('express');
const app = express();

app.use(express.json());

// Разреши CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const TELEGRAM_TOKEN = '8602855151:AAH0Ai-og-0ZqKlgR7dGCYbxoMKbJx0Ehfw';
const TELEGRAM_CHAT_ID = '-1003998726410';

app.post('/send-to-telegram', async (req, res) => {
  try {
    const { text } = req.body;
    
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown'
        })
      }
    );
    
    const data = await response.json();
    res.json({ success: true, data });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Сервер запущен на :3000'));
