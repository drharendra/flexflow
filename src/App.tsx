import React, { useState } from 'react';
import { Activity, LayoutDashboard, Users, UserCircle, Settings, Bell, Search, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'motion/react';
import PostureVisualizer from './components/dashboard/PostureVisualizer';
import StatsGrid from './components/dashboard/StatsGrid';
import RecoveryTimeline from './components/dashboard/RecoveryTimeline';
import PatientList from './components/dashboard/PatientList';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">FlexFlow <span className="text-blue-600">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 ring-1 ring-emerald-200/50">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider">LIVE STREAMING</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Practitioner</span>
            <span className="text-sm font-semibold text-slate-700">Dr. Sarah Chen</span>
          </div>
          <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=physio" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Panel: Progress & History */}
        <aside className="w-80 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recovery Statistics</h3>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Range of Motion</span>
                  <span className="text-blue-600">82%</span>
                </div>
                <Progress value={82} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Stability Score</span>
                  <span className="text-emerald-600">64%</span>
                </div>
                <Progress value={64} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm flex-1">
            <CardHeader className="pb-3">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient List</h3>
            </CardHeader>
            <CardContent className="p-0">
              <PatientList />
            </CardContent>
          </Card>
        </aside>

        {/* Central Vision Engine */}
        <section className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-slate-900">
             <PostureVisualizer />
          </div>
          <div className="h-48 overflow-visible">
             <StatsGrid />
          </div>
        </section>

        {/* Right Panel: AI Feedback & Controls */}
        <aside className="w-80 flex flex-col gap-6 overflow-y-auto pl-2 custom-scrollbar">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Real-time Feedback</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Maintain torso stability. Slight lumbar drift detected in last 3 reps.</p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Knee alignment optimal. Consistent movement flow observed.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg flex-1 flex flex-col justify-between border-none relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Activity className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h4 className="text-lg font-bold leading-tight mb-2">Session Flow Optimizer</h4>
              <p className="text-blue-100 text-xs leading-relaxed opacity-80 mb-6">
                FlexFlow AI has calculated a 12% improvement in movement continuity compared to previous session trends.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Session Avg Angle</p>
                  <p className="text-xl font-bold">98.5°</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Target Range</p>
                  <p className="text-xl font-bold">115.0° - 125.0°</p>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm h-12 rounded-xl transition-all shadow-md active:scale-[0.98]">
              Generate Analytics Report
            </Button>
          </Card>
        </aside>
      </main>

      {/* Footer Status */}
      <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">
        <div className="flex gap-8">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Device: CV-CAMERA-01 (4K)</span>
          <span>LATENCY: 12ms</span>
          <span>SENSORS: CALIBRATED</span>
        </div>
        <div>
          &copy; 2026 FlexFlow AI &bull; Computer Vision for Physio Recovery
        </div>
      </footer>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}>
      {icon}
      {label}
    </button>
  );
}
