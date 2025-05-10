const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());  // CORS muammosini hal qilish uchun
app.use(express.json());  // JSON ma'lumotlarni qabul qilish uchun

app.post('/send-login-data', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Barcha maydonlar to‘ldirilishi shart!' });
    }

    fs.readFile('./api/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Faylni o‘qishda xatolik:', err);
            return res.status(500).json({ success: false, message: 'Server xatosi' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const newUser = { username, email, password };
        users.push(newUser);

        fs.writeFile('./api/users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Faylga yozishda xatolik:', err);
                return res.status(500).json({ success: false, message: 'Ma’lumot saqlanmadi' });
            }

            res.json({ success: true, message: 'Ro‘yxatdan o‘tish muvaffaqiyatli!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlayapti`);
});
