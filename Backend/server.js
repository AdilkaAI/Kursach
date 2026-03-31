const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey12345';

// Временное хранилище
let users = [];
let questions = [];

// ====================== AUTH ======================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role = 'Student' } = req.body;

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role
    };

    users.push(user);

    res.status(201).json({ 
      message: 'Регистрация успешна', 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Успешный вход',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ====================== QUESTIONS ======================
app.post('/api/questions', (req, res) => {
  const { title, description, category } = req.body;
  const question = {
    id: Date.now().toString(),
    title,
    description,
    category,
    status: 'open',
    studentId: req.body.studentId,
    expertId: null,
    answers: []
  };
  questions.push(question);
  res.status(201).json(question);
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.get('/api/questions/my', (req, res) => {
  // Здесь позже добавим фильтр по пользователю
  res.json(questions);
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` QazConsult Backend запущен на http://localhost:${PORT}`);
});