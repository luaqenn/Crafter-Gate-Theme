import HeroImage from "./contents/image";
import { Website } from "@/lib/types/website";

export default function Hero({
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
    <div className="flex flex-col">
      <HeroImage
        bannerImage={bannerImage}
        logoImage={logoImage}
        socialMedia={socialMedia}
        minecraftStatus={minecraftStatus}
        discordStatus={discordStatus}
      />
    </div>
  );
}
