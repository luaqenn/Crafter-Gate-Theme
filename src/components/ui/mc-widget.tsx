import { Card, CardContent } from "./card";
import Image from "next/image";

export default function McWidget({ status }: { status: any }) {
  return (
    <Card className="bg-card/95 backdrop-blur-md border border-border/20 py-5 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl w-full group cursor-pointer hover:scale-105 hover:-translate-y-1 relative">
      <CardContent className="flex items-center gap-4 py-0 px-5">
        <div className="flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
          <Image
            src={status.favicon}
            alt="Minecraft"
            width={128}
            height={128}
            className="w-11 h-11 object-contain"
          />
        </div>
        <div className="flex justify-between flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-card-foreground truncate">
            {status.hostname}
          </span>
          <span
            className="text-xs text-muted-foreground line-clamp-2"
            dangerouslySetInnerHTML={{ __html: status.motd }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
