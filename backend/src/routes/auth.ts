import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User found, comparing password...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('[POST /auth/login] DB Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Route to create the first admin user (protected by a secret header)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const registrationSecret = req.headers['x-registration-secret'];

  // Check for a secret key to prevent public registrations
  if (registrationSecret !== process.env.REGISTRATION_SECRET) {
    return res.status(403).json({ error: 'Unauthorized registration attempt' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });
    res.json({ message: 'User created' });
  } catch (error) {
    console.error('[POST /auth/register] DB Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
