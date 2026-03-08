import { useCountUp } from '@/hooks/useCountUp';
import { TrendingUp, Users, Briefcase, Globe } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: 10, suffix: '+', icon: TrendingUp },
  { label: 'Clients Served', value: 250, suffix: '+', icon: Users },
  { label: 'Projects Completed', value: 500, suffix: '+', icon: Briefcase },
  { label: 'Countries Reached', value: 15, suffix: '+', icon: Globe },
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp({ end: stat.value, duration: 2200 });

  return (
    <div
      ref={ref}
      className="relative text-center group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-coral/20 transition-colors duration-300">
        <stat.icon className="w-6 h-6 text-coral" />
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-2 tabular-nums">
        {count}<span className="text-coral">{stat.suffix}</span>
      </div>
      <p className="text-sm md:text-base text-muted-foreground font-medium tracking-wide uppercase">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Track Record
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Numbers That Speak
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A decade of delivering excellence across industries and borders.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
