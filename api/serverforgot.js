module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email kiritilmadi' });
        }

        // Ehtiyotkorlik uchun: shu yerga emailingizga real link yuborish kodini qo‘yishingiz mumkin.
        console.log(`Tiklash linki yuborildi: ${email}`);

        return res.status(200).json({ success: true, message: 'Tiklash linki yuborildi' });
    } else {
        return res.status(405).json({ success: false, message: 'Faqat POST ruxsat etiladi' });
    }
};
