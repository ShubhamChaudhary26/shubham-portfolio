import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image: string;
  link: string;
  publishedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  content: { type: String },
  image: { type: String },
  link: { type: String },
  publishedAt: { type: Date },
}, { timestamps: true });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
