const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Hamma maydonlarni to‘ldiring!' });
        }

        const newUser = { username, email, password };
        const filePath = path.join(__dirname, 'users.json');

        let users = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            users = JSON.parse(data);
        }

        users.push(newUser);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        return res.status(200).json({ success: true, message: 'Foydalanuvchi qo‘shildi' });
    } else {
        return res.status(405).json({ success: false, message: 'Faqat POST ruxsat etiladi' });
    }
};
