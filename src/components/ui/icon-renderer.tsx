"use client";

import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

export function IconRenderer({ iconName, className }: IconRendererProps) {
  // İcon adını PascalCase'e çevir
  const formattedIconName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Lucide iconları içinden uygun olanı bul
  const IconComponent = (LucideIcons as any)[formattedIconName] || LucideIcons.Circle;

  return <IconComponent className={cn("w-4 h-4", className)} />;
}