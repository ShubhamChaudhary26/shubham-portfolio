import Parser from 'rss-parser';
import mongoose from 'mongoose';
import Blog from '../models/Blog';
import dotenv from 'dotenv';

dotenv.config();

const parser = new Parser();

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI as string, { dbName: 'portfolio' });
  console.log('✅ Connected to MongoDB');
}

async function fetchBlogs() {
  await connectDB();
  const feed = await parser.parseURL('https://techcrunch.com/feed/');

  for (const item of feed.items.slice(0, 5)) {
    const slug = item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
    if (!slug) continue;

    const exists = await Blog.findOne({ slug });
    if (exists) continue;

    await Blog.create({
      title: item.title,
      slug,
      content: item.contentSnippet || '',
      image: item.enclosure?.url || '/default.jpg',
      link: item.link,
      publishedAt: item.pubDate,
    });

    console.log(`📝 Added: ${item.title}`);
  }

  console.log('✅ Blogs Updated!');
  process.exit();
}

fetchBlogs().catch((err) => {
  console.error(err);
  process.exit(1);
});
