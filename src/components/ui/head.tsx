"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeadProps {
  username: string;
  size?: number;
  className?: string;
}

export function Head({ username, size = 32, className }: HeadProps) {
  return (
    <Image
      src={`https://mc-heads.net/avatar/${username}/${size}`}
      alt={`${username} avatar`}
      width={size}
      height={size}
      className={cn("rounded", className)}
      unoptimized
    />
  );
}