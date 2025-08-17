'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  autoRotate?: boolean;
  rotateInterval?: number;
  className?: string;
}

export function Carousel({
  autoRotate = true,
  rotateInterval = 5000,
  className = ''
}: CarouselProps) {
  const banners = [
    '/assets/images/helmets/banner/banner-1.jpg',
    '/assets/images/helmets/banner/banner-2.jpg',
    '/assets/images/helmets/banner/banner-3.jpg',
    '/assets/images/helmets/banner/banner-4.jpg',
    '/assets/images/helmets/banner/banner-5.jpg',
    '/assets/images/helmets/banner/banner-6.jpg'
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, rotateInterval]);

  return (
    <div className={`relative h-[600px] w-full overflow-hidden ${className}`}>
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner} className="relative w-full flex-shrink-0">
            <Image
              src={banner}
              alt="Safety equipment"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center transition-opacity duration-300"
              priority
            />
          </div>
        ))}
      </div>
      
      {/* Company info overlay */}
      <div className="absolute bottom-10 left-10 max-w-md  dark:bg-black/30 p-6 text-white dark:text-black rounded-lg shadow-lg border border-white/10 dark:border-black/20">
        <h1 className="text-3xl font-bold mb-2">AccidentAware</h1>
        
        <div >
          <p className="text-lg mb-3">Next-generation safety solutions</p>
          <p> Creating a world where preventable accidents are eliminated through smart technology.</p>
          <p> Revolutionizing safety with intelligent helmets that protect lives and provide real-time monitoring.</p>
        </div>
      </div>
    </div>
  );
}