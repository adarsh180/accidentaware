'use client';

import { Card } from '@/components/ui/card';
import { InteractiveMap } from '@/components/ui/map';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="p-6 space-y-2">
      <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

export function Dashboard() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real-Time Accident Detection</h2>
          <p className="text-lg text-muted-foreground">
            Monitor and respond to incidents as they happen with our advanced detection system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Monitors"
            value="2,547"
            description="Devices currently online and monitoring"
          />
          <StatCard
            title="Response Time"
            value="< 2min"
            description="Average emergency response time"
          />
          <StatCard
            title="Lives Protected"
            value="10,000+"
            description="Users protected by our system"
          />
        </div>

        <Card className="p-6">
          <div className="aspect-video relative bg-slate-100 rounded-lg overflow-hidden">
            <InteractiveMap />
          </div>
        </Card>
      </div>
    </section>
  );
}