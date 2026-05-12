import { motion } from 'motion/react';
import { Camera, Maximize2, ShieldCheck, Info, RefreshCw, Eye, EyeOff, RotateCcw, Sliders, Layers, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

export default function PostureVisualizer() {
  const [isScanning, setIsScanning] = useState(true);
  const [showCamera, setShowCamera] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(80);
  const [jointAngles, setJointAngles] = useState({ knee: 110, hip: 95, shoulder: 45 });
  const [sessionDuration, setSessionDuration] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [isRepInProgress, setIsRepInProgress] = useState(false);
  const [feedback, setFeedback] = useState({ 
    message: "Analyzing posture dynamics...", 
    type: "info" 
  });

  // Session Duration Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rep Counting Logic (Simulated)
  useEffect(() => {
    // Threshold for a rep: flex > 112 then extend < 108
    if (jointAngles.knee > 113 && !isRepInProgress) {
      setIsRepInProgress(true);
    } else if (jointAngles.knee < 107 && isRepInProgress) {
      setRepCount(prev => prev + 1);
      setIsRepInProgress(false);
    }
  }, [jointAngles.knee, isRepInProgress]);

  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // AI Feedback Logic
  useEffect(() => {
    if (jointAngles.knee > 115) {
      setFeedback({ message: "Knee flexion exceeds target. Adjust depth.", type: "warning" });
    } else if (jointAngles.hip < 92) {
      setFeedback({ message: "Slight hip tilt detected. Level your pelvis.", type: "warning" });
    } else if (jointAngles.knee < 105) {
      setFeedback({ message: "Increase knee flexion for optimal recovery.", type: "info" });
    } else {
      setFeedback({ message: "Posture alignment optimal. Maintain flow.", type: "success" });
    }
  }, [jointAngles]);

  // Sync simulation of joint angles
  useEffect(() => {
    const interval = setInterval(() => {
      setJointAngles(prev => ({
        knee: prev.knee + (Math.random() > 0.5 ? 1 : -1) * 0.5,
        hip: prev.hip + (Math.random() > 0.5 ? 1 : -1) * 0.3,
        shoulder: prev.shoulder + (Math.random() > 0.5 ? 1 : -1) * 0.2,
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setJointAngles({ knee: 110, hip: 95, shoulder: 45 });
    setShowCamera(true);
    setOverlayOpacity(80);
    setSessionDuration(0);
    setRepCount(0);
    setIsRepInProgress(false);
    setFeedback({ message: "System recalibrated. Session restarted.", type: "info" });
  };

  return (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden group">
      {/* Mock Camera Feed Background */}
      {showCamera && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#334155_0%,_#0f172a_100%)] opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <Camera className="w-64 h-64 text-white" strokeWidth={0.5} />
          </div>
        </div>
      )}

      {/* Control Panel Overlay */}
      <div className="absolute top-6 left-6 z-50">
        <div className="flex flex-col gap-2 p-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-10 w-10 rounded-xl transition-all ${showCamera ? 'text-blue-400 bg-blue-500/10' : 'text-white/40 hover:text-white'}`}
            onClick={() => setShowCamera(!showCamera)}
            title="Toggle Camera Feed"
          >
            {showCamera ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>

          <div className="relative group/slider flex items-center justify-center h-10 w-10">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 group-hover/slider:text-blue-400 transition-colors">
              <Layers className="h-5 w-5" />
            </Button>
            <div className="absolute left-12 invisible group-hover/slider:visible bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2 w-48 shadow-2xl origin-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Overlay Opacity</span>
                <span className="text-[10px] font-mono text-blue-400">{overlayOpacity}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={overlayOpacity} 
                onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
            onClick={handleReset}
            title="Reset View"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scientific Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#475569" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Skeleton Visualization Layer (SVG Overlay) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300"
        style={{ opacity: overlayOpacity / 100 }}
      >
         <div className="relative w-64 h-[450px]">
           <svg className="w-full h-full text-blue-400" viewBox="0 0 100 200">
              <defs>
                <filter id="glow-effect">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <motion.g 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                filter="url(#glow-effect)"
              >
                {/* Torso */}
                <circle cx="50" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="50" y1="28" x2="50" y2="100" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Arms */}
                <line x1="50" y1="40" x2="25" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="50" y1="40" x2="75" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                
                {/* Focused Leg (Knee Flexion) */}
                <line x1="50" y1="100" x2="35" y2="140" stroke="#38bdf8" strokeWidth="3" />
                <line x1="35" y1="140" x2="55" y2="190" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                
                {/* Joints */}
                <circle cx="35" cy="140" r="4" fill="#38bdf8" />
                <circle cx="50" cy="100" r="3" fill="currentColor" />
                <circle cx="55" cy="190" r="3" fill="currentColor" />
              </motion.g>
           </svg>

           {/* Dynamic Floating Callouts */}
           <motion.div 
             animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-[130px] left-[-60px] bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20 shadow-2xl z-30"
           >
              <p className="text-[9px] text-white/60 font-bold tracking-widest uppercase mb-0.5">Left Knee</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-400 tracking-tighter">{jointAngles.knee.toFixed(1)}</span>
                <span className="text-xs font-bold text-blue-400/60 font-mono">°</span>
              </div>
           </motion.div>

           <motion.div 
             animate={{ x: [0, -2, 0], y: [0, 2, 0] }}
             transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
             className="absolute top-[90px] right-[-60px] bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20 shadow-2xl z-30"
           >
              <p className="text-[9px] text-white/60 font-bold tracking-widest uppercase mb-0.5">Hip Angle</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tracking-tighter">{jointAngles.hip.toFixed(1)}</span>
                <span className="text-xs font-bold text-white/60 font-mono">°</span>
              </div>
           </motion.div>
         </div>
      </div>

      {/* HUD Elements */}
      <div className="absolute bottom-10 left-10 z-40 space-y-4">
        <div className="flex gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-3 rounded-xl min-w-[100px]">
             <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-1">Session Time</p>
             <p className="text-xl font-mono font-bold text-white tracking-tight">{formatDuration(sessionDuration)}</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-3 rounded-xl min-w-[100px]">
             <p className="text-[9px] text-white/40 font-bold tracking-widest uppercase mb-1">Rep Count</p>
             <div className="flex items-baseline gap-1">
               <span className="text-xl font-mono font-bold text-blue-400 tracking-tight">{repCount}</span>
               <span className="text-[10px] text-white/40 font-mono">REPS</span>
             </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            <span className="text-white font-mono text-[10px] tracking-[0.2em] font-bold">FRAME ANALYSIS: ACTIVE</span>
          </div>
          <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               animate={{ x: ['-100%', '100%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               className="h-full w-1/2 bg-blue-500" 
             />
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 z-40 text-right">
        <p className="text-white/40 text-[9px] font-bold tracking-widest uppercase mb-1">CV Confidence</p>
        <div className="flex items-baseline justify-end gap-1">
          <span className="text-3xl font-mono font-bold text-white tracking-tight">98.42</span>
          <span className="text-sm font-mono font-medium text-white/60">%</span>
        </div>
      </div>

      {/* Real-time AI Feedback Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6">
        <motion.div 
          key={feedback.message}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`flex items-center gap-3 p-4 rounded-2xl backdrop-blur-2xl border shadow-2xl transition-colors duration-500 ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : feedback.type === 'warning'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
          }`}
        >
          <div className="flex-shrink-0">
            {feedback.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
            {feedback.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
            {feedback.type === 'info' && <Sparkles className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-0.5">AI Guidance</p>
            <p className="text-sm font-semibold truncate leading-tight font-sans tracking-tight">
              {feedback.message}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scanning Laser Line */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 w-full h-[1px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10 pointer-events-none"
      />
    </div>
  );
}
