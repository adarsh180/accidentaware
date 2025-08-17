'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/0.1),transparent)]" />
      
      <div className="container relative flex flex-col lg:flex-row items-center justify-between gap-8 py-16 md:py-24">
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary">Smart Helmet</span> for{" "}
            <br className="hidden sm:inline" />
            Safer Riding
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Advanced accident detection and emergency response system built into a premium helmet. Stay protected on every journey.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" asChild>
              <Link href="/product">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Banner Carousel */}
        <motion.div 
          className="flex-1 relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div key={banner} className="relative w-full flex-shrink-0">
                <Image
                  src={banner}
                  alt={`Safety equipment ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center transition-opacity duration-300"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          {/* Floating Elements removed */}
        </motion.div>
      </div>
    </section>
  );
}