import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Test the connection and handle any errors
prisma.$connect()
  .then(() => console.log('Connected to PostgreSQL database successfully.'))
  .catch((err) => console.error('Error connecting to PostgreSQL database:', err));

export default prisma;