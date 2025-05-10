// api/enterserver.js
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // JWT token uchun modul
const USERS_FILE = './api/users.json';  // Foydalanuvchilar ro'yxati joylashgan fayl
const JWT_SECRET = 'your_jwt_secret_key';  // Maxfiy kalit

export default async function handler(req, res) {
    // Agar so'rov POST bo'lmasa, 405 xatosi qaytaramiz
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    try {
        // USERS_FILE faylini o'qish
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        const users = JSON.parse(data);  // JSON formatiga aylantirish

        // Foydalanuvchini email orqali qidiring
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email topilmadi.' });
        }

        // Parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Email yoki parol xato.' });
        }

        // JWT token yaratish
        const token = jwt.sign(
            { email: user.email, username: user.username }, // Payload: foydalanuvchi ma'lumotlari
            JWT_SECRET,  // Maxfiy kalit
            { expiresIn: '1h' }  // Token 1 soatga amal qiladi
        );

        return res.status(200).json({
            success: true,
            message: 'Kirish muvaffaqiyatli!',
            token: token  // Tokenni responsega yuborish
        });
    } catch (error) {
        console.error(error);  // Xatolikni konsolga yozish
        return res.status(500).json({ success: false, message: 'Server xatosi.' });
    }
            }
