import { BarChart3, Eye, EyeOff, Calendar } from 'lucide-react';
import type { SubmissionStats } from '@/types/submission';

interface StatsBarProps {
  stats: SubmissionStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      label: 'Totale',
      value: stats.total,
      icon: BarChart3,
      color: 'text-purple-400',
    },
    {
      label: 'Non Letti',
      value: stats.unread,
      icon: EyeOff,
      color: 'text-blue-400',
    },
    {
      label: 'Oggi',
      value: stats.today,
      icon: Calendar,
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-6 border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
