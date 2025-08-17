'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Real-Time Accident Detection",
    description: "Advanced sensors continuously monitor your movement and instantly detect potential accidents.",
    icon: "/assets/icons/detection.svg",
    delay: 0.2
  },
  {
    title: "Emergency Response",
    description: "Automatic alerts to emergency contacts and services when an accident is detected.",
    icon: "/assets/icons/emergency.svg",
    delay: 0.4
  },
  {
    title: "GPS Tracking",
    description: "Precise location tracking ensures help reaches you exactly where you need it.",
    icon: "/assets/icons/gps.svg",
    delay: 0.6
  },
  {
    title: "Smart Analytics",
    description: "Get insights into your riding patterns and safety statistics through our dashboard.",
    icon: "/assets/icons/analytics.svg",
    delay: 0.8
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How AccidentAware Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our smart helmet combines cutting-edge technology with intuitive design to keep you safe on every ride.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <Card className="relative overflow-hidden h-full">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2">
                    <div className="h-24 w-24 rounded-full bg-primary/10" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}