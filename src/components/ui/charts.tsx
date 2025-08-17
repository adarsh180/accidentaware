'use client';

import { useEffect, useRef } from 'react';

export function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sample data - rides per month
    const data = [5, 8, 12, 15, 18, 22, 25, 20, 16, 18, 24, 28];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 11; i++) {
      const x = padding + (chartWidth / 11) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const maxValue = Math.max(...data);
    data.forEach((value, index) => {
      const x = padding + (chartWidth / 11) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#3b82f6';
    data.forEach((value, index) => {
      const x = padding + (chartWidth / 11) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / 11) * index;
      ctx.fillText(label, x, height - 10);
    });

  }, []);

  return (
    <div className="w-full h-64">
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        className="w-full h-full"
      />
    </div>
  );
}

export function PieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sample data - safety score distribution
    const data = [
      { label: 'Safe Rides', value: 65, color: '#10b981' },
      { label: 'Moderate Risk', value: 25, color: '#f59e0b' },
      { label: 'High Risk', value: 8, color: '#ef4444' },
      { label: 'Incidents', value: 2, color: '#6b7280' }
    ];

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    // Draw pie slices
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Draw slice border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Draw legend
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    
    data.forEach((item, index) => {
      const y = 20 + index * 20;
      
      // Legend color box
      ctx.fillStyle = item.color;
      ctx.fillRect(10, y - 8, 12, 12);
      
      // Legend text
      ctx.fillStyle = '#374151';
      ctx.fillText(`${item.label}: ${item.value}%`, 30, y + 2);
    });

  }, []);

  return (
    <div className="w-full h-64">
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        className="w-full h-full"
      />
    </div>
  );
}