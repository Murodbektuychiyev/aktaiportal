const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  // Bcrypt parolni hash qilish uchun
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Dummy user data (you can replace it with a real database)
const users = [
  { email: 'user@example.com', passwordHash: '$2b$10$TmEVoXf9zBvv1sHk5J0YveWa2OQjAzpBpUwMBFZ2aOPXMeyuBOj9S' }  // Hashlangan parol: '123456'
];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (user) {
    // Compare the provided password with the stored hash
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, message: 'Xatolik yuz berdi.' });
      }

      if (isMatch) {
        // If login is successful
        res.json({ success: true, message: 'Kirish muvaffaqiyatli!' });
      } else {
        // If login fails (wrong password)
        res.json({ success: false, message: 'Email yoki parol xato!' });
      }
    });
  } else {
    // If no user is found
    res.json({ success: false, message: 'Foydalanuvchi topilmadi.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
