"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Users, Youtube } from "lucide-react";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import Image from "next/image";
import HeroCards from "./cards";
import { Website } from "@/lib/types/website";

export default function HeroImage({
  bannerImage,
  logoImage,
  socialMedia,
  minecraftStatus,
  discordStatus,
}: {
  bannerImage: string;
  logoImage: string;
  socialMedia: Website["social_media"];
  minecraftStatus: any;
  discordStatus: any;
}) {
  return (
    <div className="relative overflow-hidden h-auto min-h-[400px] sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
      {/* Minimalist Background with Subtle Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageLinkGenerate(bannerImage)}
          alt="Background Banner"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        {/* Logo with Subtle Shadow - Mobile First */}
        <div className="mb-6 sm:mb-8">
          <Image
            src={imageLinkGenerate(logoImage)}
            alt="Logo"
            width={200}
            height={200}
            className="object-contain w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-2xl"
            priority
            sizes="(max-width: 640px) 128px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
          />
        </div>

        {/* Cards Overlay - Mobile Responsive */}
        <HeroCards socialMedia={socialMedia} minecraftStatus={minecraftStatus} discordStatus={discordStatus} />
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}