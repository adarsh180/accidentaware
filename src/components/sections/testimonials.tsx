'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Rider",
    image: "/assets/images/testimonials/sarah.svg",
    content: "AccidentAware's smart helmet has completely transformed how I think about safety while riding. The real-time accident detection gives me peace of mind on every journey.",
    delay: 0.2
  },
  {
    name: "Michael Chen",
    role: "Daily Commuter",
    image: "/assets/images/testimonials/michael.svg",
    content: "The emergency response feature is incredible. After a minor incident, the helmet automatically alerted my emergency contacts. It's like having a guardian angel.",
    delay: 0.4
  },
  {
    name: "David Smith",
    role: "Adventure Enthusiast",
    image: "/assets/images/testimonials/david.svg",
    content: "The GPS tracking and analytics have helped me become a better rider. I can review my routes and get insights into my riding patterns. It's both safe and smart!",
    delay: 0.6
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Riders Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our community about how AccidentAware has enhanced their riding experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div 
          className="mt-16 pt-8 border-t"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary">10K+</h4>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary">98%</h4>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary">24/7</h4>
              <p className="text-muted-foreground">Support Available</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary">150+</h4>
              <p className="text-muted-foreground">Lives Protected</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}