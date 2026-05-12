import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, ExternalLink } from 'lucide-react';

const patients = [
  { id: '1045', name: 'John Doe', injury: 'ACL Recovery', progress: 84, status: 'Active', pulse: 'Steady' },
  { id: '1046', name: 'Alisa Vose', injury: 'Lumbar Strain', progress: 62, status: 'Active', pulse: 'Improving' },
  { id: '1047', name: 'Robert Fox', injury: 'Shoulder Impingement', progress: 34, status: 'Stalled', pulse: 'Needs Review' },
  { id: '1048', name: 'Cody Fisher', injury: 'Ankle Sprain', progress: 91, status: 'Completed', pulse: 'Discharge Ready' },
  { id: '1049', name: 'Jane Cooper', injury: 'Cervical Radiculopathy', progress: 45, status: 'Active', pulse: 'Steady' },
  { id: '1050', name: 'Guy Hawkins', injury: 'Tennis Elbow', progress: 78, status: 'Active', pulse: 'Consistent' },
];

export default function PatientList() {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200 h-[480px] flex flex-col bg-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-6 py-4">
        <CardTitle className="text-lg">Recent Patients</CardTitle>
        <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
          View All <ChevronRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <ScrollArea className="h-full max-h-[400px]">
          <div className="divide-y divide-slate-50">
            {patients.map((patient) => (
              <div key={patient.id} className="group p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-100 ring-2 ring-white">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {patient.name}
                    </h4>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                      ID: {patient.id} • {patient.injury}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={patient.status === 'Active' ? 'default' : patient.status === 'Completed' ? 'secondary' : 'destructive'} 
                    className={`text-[9px] h-4 tracking-tighter ${patient.status === 'Active' ? 'bg-blue-600' : ''}`}>
                    {patient.status}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-medium">Progress: {patient.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
