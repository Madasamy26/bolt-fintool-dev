import express from 'express';
import { register, verify, login } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

export default router;