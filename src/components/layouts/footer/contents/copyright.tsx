"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Copyright({ name }: { name: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Use resolvedTheme to get the actual theme (including system preference)
  const currentTheme = resolvedTheme || theme;
  const logoSrc = currentTheme === "dark" ? "/crafter.png" : "/crafter-light.png";

  return (
    <div className="container flex max-lg:flex-col gap-y-4 max-lg:text-center items-center justify-between py-4">
      <p className="text-sm text-muted-foreground">
        ©&nbsp;2025&nbsp;{name}. Tüm hakları saklıdır.
      </p>
      <Link href="https://crafter.net.tr" target="_blank">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Powered by</p>
          <Image 
            src={logoSrc} 
            alt="logo" 
            width={100} 
            height={100} 
          />
        </div>
      </Link>
      <p className="text-sm text-muted-foreground" aria-disabled="true">
        {name} is not affiliated with Mojang AB or Microsoft.
      </p>
    </div>
  );
}
