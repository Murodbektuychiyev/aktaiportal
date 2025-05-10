// api/serverforgot.js
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.resolve('api/users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POST usuli kerak' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email kiriting' });
  }

  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ success: false, message: 'Email topilmadi' });
  }

  // Bu yerda haqiqiy email jo‘natish yo‘q, shunchaki muvaffaqiyatli javob
  res.status(200).json({ success: true, message: 'Tiklash linki yuborildi (simulyatsiya)' });
}
