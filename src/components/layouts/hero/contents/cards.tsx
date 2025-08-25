import { Card, CardContent } from "@/components/ui/card";
import { Website } from "@/lib/types/website";
import Link from "next/link";
import { renderSocialIcon } from "@/lib/helpers/renderIcon";
import { FaDiscord } from "react-icons/fa";
import McWidget from "@/components/ui/mc-widget";

export default function HeroCards({
  socialMedia,
  minecraftStatus,
  discordStatus,
}: {
  socialMedia: Website["social_media"];
  minecraftStatus: any;
  discordStatus: any;
}) {
  const socialMediaArray = Object.entries(socialMedia).map(([key, value]) => {
    return {
      key,
      value,
    };
  });  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 justify-center items-center max-w-4xl w-full">
      {/* Server Information Card */}
      <Link href="/home#server">
        <McWidget status={minecraftStatus} />
      </Link>

      {/* Discord Server Card */}
      <Link
        href={discordStatus.invite || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card className="bg-[#5865F2] hover:bg-[#4752C4] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl w-full max-w-sm group cursor-pointer hover:scale-105 hover:-translate-y-1">
          <CardContent className="flex items-center gap-4 py-0 px-5">
            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <FaDiscord className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white">
                Discord Sunucusu
              </span>
              <span className="text-xs text-white/90 font-medium">
                Diğer {discordStatus.online} Oyuncu ile Tanış
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Social Media Card */}
      <Card className="bg-card/95 py-8 backdrop-blur-md border border-border/20 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl w-full max-w-sm group cursor-pointer hover:scale-105 hover:-translate-y-1">
        <CardContent className="flex items-center justify-center gap-3 px-5">
          {socialMediaArray.map((item) => (
            <div
              key={item.key}
              className="p-1 border border-border/50 rounded-2xl hover:bg-accent/50 transition-colors duration-200"
            >
              {renderSocialIcon(item.key, item.value, undefined, 5, 5)}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
