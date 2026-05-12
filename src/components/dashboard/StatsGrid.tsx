import React from 'react';
import { Users, Activity, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

function ColorIcon({ color, children }: { color: string, children: React.ReactNode }) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50',
    emerald: 'bg-emerald-50',
    indigo: 'bg-indigo-50',
    amber: 'bg-amber-50'
  };
  return <div className={`p-2 rounded-lg ${bgColors[color] || 'bg-slate-50'}`}>{children}</div>;
}

function StatBadge({ color, change }: { color: string, change: string }) {
  const isPositive = change.startsWith('+');
  const bgClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 ring-emerald-200 text-emerald-600',
    slate: 'bg-slate-50 ring-slate-200 text-slate-500'
  };
  const key = isPositive ? 'emerald' : 'slate';
  return (
    <span className={`text-xs font-bold ${bgClasses[key]} px-2 py-0.5 rounded-full ring-1`}>
      {change}
    </span>
  );
}

function StatProgress({ color }: { color: string }) {
  const barColors: Record<string, string> = {
    blue: 'bg-blue-500/50',
    emerald: 'bg-emerald-500/50',
    indigo: 'bg-indigo-500/50',
    amber: 'bg-amber-500/50'
  };
  return (
    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '70%' }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full ${barColors[color] || 'bg-slate-500/50'}`}
      />
    </div>
  );
}

export default function StatsGrid() {
  const stats = [
    { 
      label: 'Active Patients', 
      value: '124', 
      change: '+12%', 
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: 'blue'
    },
    { 
      label: 'Recovery Rate', 
      value: '82.4%', 
      change: '+3.2%', 
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      color: 'emerald'
    },
    { 
      label: 'Avg. Joint Mobility', 
      value: '112°', 
      change: '+8%', 
      icon: <Activity className="h-5 w-5 text-indigo-600" />,
      color: 'indigo'
    },
    { 
      label: 'Pending Reviews', 
      value: '18', 
      change: '-4', 
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
      color: 'amber'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <ColorIcon color={stat.color}>{stat.icon}</ColorIcon>
                <StatBadge color={stat.color} change={stat.change} />
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <StatProgress color={stat.color} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
