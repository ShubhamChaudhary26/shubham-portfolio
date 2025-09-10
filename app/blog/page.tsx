'use client';

import useSWR from 'swr';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  link: string;
  publishedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogPage() {
  const { data: blogs } = useSWR<Blog[]>('/api/blogs', fetcher);

  if (!blogs) return <div className="p-8">Loading blogs...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Latest Tech Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-xl p-4 shadow">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(blog.publishedAt).toDateString()}
            </p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
