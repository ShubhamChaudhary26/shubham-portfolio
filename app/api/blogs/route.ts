import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '../../../models/Blog';

export async function GET() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI as string, { dbName: 'portfolio' });
  }

  const blogs = await Blog.find().sort({ publishedAt: -1 }).limit(10);
  return NextResponse.json(blogs);
}
