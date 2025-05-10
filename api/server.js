// api/server.js
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const USERS_FILE = path.resolve('api/users.json');
const JWT_SECRET = 'my_secret_key_123'; // .env o‘rniga

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POST usuli kerak' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Barcha maydonlarni to‘ldiring' });
  }

  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE);
    users = JSON.parse(data);
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'Bu email ro‘yxatdan o‘tgan' });
  }

  const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });
  users.push({ username, email, password });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(200).json({ success: true, token });
}
