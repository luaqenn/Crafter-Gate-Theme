"use client";

import { Badge } from "@/components/ui/badge";

interface ServerStatusBarProps {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
}

export default function ServerStatusBar({ online, players, version }: ServerStatusBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-background/80 backdrop-blur-sm rounded-lg border">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">
          {online ? 'Çevrimiçi' : 'Çevrimdışı'}
        </span>
      </div>
      
      {players && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Oyuncular:</span>
          <Badge variant="secondary">
            {players.online}/{players.max}
          </Badge>
        </div>
      )}
      
      {version && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sürüm:</span>
          <Badge variant="outline">
            {version}
          </Badge>
        </div>
      )}
    </div>
  );
}