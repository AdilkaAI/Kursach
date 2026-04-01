const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ai', require('./routes/ai'));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB подключён успешно'))
  .catch(err => console.error('X Ошибка MongoDB:', err.message));

// ====================== МОДЕЛИ ======================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Expert', 'Admin'], default: 'Student' }
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentId: String,
  expertId: String,
  status: { type: String, default: 'open' },
  answers: [{
    text: String,
    expertName: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

// ====================== АУТЕНТИФИКАЦИЯ ======================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ 
      message: 'Регистрация успешна', 
      user: { id: user._id, name, email, role } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      message: 'Успешный вход', 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ====================== ВОПРОСЫ ======================
app.post('/api/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании вопроса' });
  }
});

app.get('/api/questions', async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
});

app.get('/api/questions/open', async (req, res) => {
  const questions = await Question.find({ status: 'open' }).sort({ createdAt: -1 });
  res.json(questions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Сервер запущен на http://localhost:${PORT}`);
});