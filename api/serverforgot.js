// register/serverforgot.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  // Nodemailer sozlamalari
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,  // Mail foydalanuvchi nomini .env faylida saqlang
      pass: process.env.MAIL_PASS,  // Mail parolni .env faylida saqlang
    },
  });

  // Parolni tiklash havolasi
  const resetLink = `${process.env.BASE_URL}/reset-password?email=${encodeURIComponent(email)}`;

  try {
    // Email yuborish
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Parolni tiklash',
      text: `Parolingizni tiklash uchun quyidagi havolani bosing: ${resetLink}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
}
