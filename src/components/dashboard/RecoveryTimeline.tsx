import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', mobility: 65, stability: 40 },
  { day: 'Tue', mobility: 68, stability: 42 },
  { day: 'Wed', mobility: 75, stability: 48 },
  { day: 'Thu', mobility: 72, stability: 45 },
  { day: 'Fri', mobility: 82, stability: 55 },
  { day: 'Sat', mobility: 88, stability: 62 },
  { day: 'Sun', mobility: 92, stability: 68 },
];

export default function RecoveryTimeline() {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-6 py-4">
        <div>
          <CardTitle className="text-lg">Recovery Trajectory</CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">Aggregate patient mobility improvememt over 7 days</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Mobility</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-200"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Stability</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMobility" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '12px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="mobility" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMobility)" 
              />
              <Area 
                type="monotone" 
                dataKey="stability" 
                stroke="#c7d2fe" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorStability)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
