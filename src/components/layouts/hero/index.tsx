import HeroImage from "./contents/image";
import { Website } from "@/lib/types/website";

export default function Hero({
  bannerImage,
  logoImage,
  socialMedia,
  status,
}: {
  bannerImage: string;
  logoImage: string;
  socialMedia: Website["social_media"];
  status: any;
}) {
  
  return (
    <div className="flex flex-col">
      <HeroImage
        bannerImage={bannerImage}
        logoImage={logoImage}
        socialMedia={socialMedia}
        status={status}
      />
    </div>
  );
}
