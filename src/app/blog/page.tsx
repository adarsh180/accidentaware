'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Smart Helmet Technology',
      excerpt: 'Exploring how AI and IoT are revolutionizing motorcycle safety with real-time accident detection and emergency response systems.',
      author: 'Adarsh Tiwari',
      date: '2024-01-15',
      category: 'Technology',
      readTime: '5 min read',
      image: '/assets/images/helmets/banner/banner-1.jpg'
    },
    {
      id: 2,
      title: 'Road Safety Statistics: Why Smart Helmets Matter',
      excerpt: 'Analyzing global road accident data and how intelligent safety systems can reduce fatalities by up to 40%.',
      author: 'AccidentAware Team',
      date: '2024-01-10',
      category: 'Safety',
      readTime: '7 min read',
      image: '/assets/images/helmets/banner/banner-2.jpg'
    },
    {
      id: 3,
      title: 'Setting Up Your Emergency Response Network',
      excerpt: 'A comprehensive guide to configuring emergency contacts and optimizing response times for maximum safety.',
      author: 'Safety Expert',
      date: '2024-01-05',
      category: 'Guide',
      readTime: '4 min read',
      image: '/assets/images/helmets/banner/banner-3.jpg'
    },
    {
      id: 4,
      title: 'GPS Tracking and Privacy: What You Need to Know',
      excerpt: 'Understanding how location data is used in smart helmets while maintaining your privacy and security.',
      author: 'Privacy Team',
      date: '2023-12-28',
      category: 'Privacy',
      readTime: '6 min read',
      image: '/assets/images/helmets/banner/banner-4.jpg'
    },
    {
      id: 5,
      title: 'Maintenance Tips for Your Smart Helmet',
      excerpt: 'Essential care instructions to keep your AccidentAware helmet functioning optimally for years to come.',
      author: 'Technical Team',
      date: '2023-12-20',
      category: 'Maintenance',
      readTime: '3 min read',
      image: '/assets/images/helmets/banner/banner-5.jpg'
    },
    {
      id: 6,
      title: 'The Science Behind Accident Detection',
      excerpt: 'Deep dive into the algorithms and sensors that power our intelligent crash detection system.',
      author: 'R&D Team',
      date: '2023-12-15',
      category: 'Technology',
      readTime: '8 min read',
      image: '/assets/images/helmets/banner/banner-6.jpg'
    }
  ];

  const categories = ['All', 'Technology', 'Safety', 'Guide', 'Privacy', 'Maintenance'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Card className="p-10 space-y-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-purple-800 mb-6">
              AccidentAware Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay updated with the latest in smart helmet technology, safety insights, and product updates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-6 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Stay Updated</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest safety insights, product updates, and technology news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
                Subscribe
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}