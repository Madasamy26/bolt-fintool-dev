import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db/index.js';
import { sendOTPEmail } from '../utils/email.js';

export const register = async (req, res) => {
  try {
    
    const { email, password,firstName,lastName } = req.body;
    console.log("register",email, password)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        firstName,
        lastName
      }
    });

    await sendOTPEmail(email, otp);

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    await prisma.user.update({
      where: { email },
      data: {
        verified: true,
        otp: null,
        otpExpiry: null
      }
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Error verifying email' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    // Record login attempt
    await prisma.loginAttempt.create({
      data: {
        userId: user.id,
        success: validPassword
      }
    });

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};