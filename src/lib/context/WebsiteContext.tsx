"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Website tipini basit bir şekilde tanımlayalım
interface Website {
  id: string;
  name: string;
  description: string;
  image: string;
  favicon: string;
  currency: string;
  theme: {
    navbar: Array<{
      url: string;
      label: string;
      icon: string;
      index: number;
    }>;
  };
  broadcast_items?: string[];
  social_media?: {
    instagram?: string;
    youtube?: string;
    discord?: string;
    twitter?: string;
    github?: string;
    tiktok?: string;
  };
  discord?: {
    guild_id?: string;
  };
  server_info?: {
    game?: string;
    version?: string;
    needs_original_minecraft?: boolean;
  };
}

interface WebsiteContextType {
  website: Website | null;
  setWebsite: (website: Website) => void;
}

const WebsiteContext = createContext<WebsiteContextType>({
  website: null,
  setWebsite: () => {},
});

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used within a WebsiteProvider");
  }
  return context;
};

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [website, setWebsite] = useState<Website | null>(null);

  // Basit bir default website yapısı
  useEffect(() => {
    // Bu veriler normalde API'den gelecek
    setWebsite({
      id: "1",
      name: "Crafter",
      description: "Minecraft sunucu teması",
      image: "/images/logo.png",
      favicon: "/favicon.ico",
      currency: "TL",
      theme: {
        navbar: [
          { url: "/home", label: "Anasayfa", icon: "home", index: 1 },
          { url: "/store", label: "Mağaza", icon: "store", index: 2 },
          { url: "/help", label: "Yardım", icon: "help-circle", index: 3 },
          { url: "/support", label: "Destek", icon: "life-buoy", index: 4 },
        ],
      },
      broadcast_items: [],
      social_media: {},
      discord: {},
      server_info: {},
    });
  }, []);

  return (
    <WebsiteContext.Provider value={{ website, setWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export { WebsiteContext };