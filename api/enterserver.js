// api/enterserver.js
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const USERS_FILE = path.resolve('api/users.json');
const JWT_SECRET = 'my_secret_key_123'; // .env o‘rniga

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POST usuli kerak' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email va parol kerak' });
  }

  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Noto‘g‘ri email yoki parol' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ success: true, token });
}
