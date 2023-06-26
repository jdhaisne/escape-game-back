import mongoose from 'mongoose';
import { logger } from './services/ESLogger';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.URI!);
    logger.info("Connected to MongoDB")
  } catch (error) {
    logger.error(`Failed to connect to MongoDB ${error}`)
  }
};