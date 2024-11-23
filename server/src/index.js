import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware to format the response
app.use((req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    // Check if the response status is 200
    if (res.statusCode === 200 || res.statusCode === 201) {
      // Parse the body if it's a JSON string
      try {
        const jsonResponse = JSON.parse(body);
        jsonResponse.ok = true; // Add ok: true
        body = JSON.stringify(jsonResponse);
      } catch (error) {
        // If parsing fails, just send the original body
      }
    } else {
      // For non-200 responses, add ok: false
      const jsonResponse = {
        ok: false,
        message: body // Include the original message
      };
      body = JSON.stringify(jsonResponse);
    }

    // Call the original send method with the modified body
    originalSend.call(this, body);
  };

  next();
});

app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'fin tool working' });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to database');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();