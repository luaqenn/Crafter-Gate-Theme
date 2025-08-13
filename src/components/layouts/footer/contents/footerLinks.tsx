import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Website } from "@/lib/types/website";
import renderIcon, { renderSocialIcon } from "@/lib/helpers/renderIcon";

export default function FooterLinks({
  logoImage,
  name,
  description,
  socialMedia,
  quickLinks,
}: {
  logoImage: string;
  name: string;
  description: string;
  socialMedia: {
    instagram: string;
    tiktok: string;
    github: string;
    twitter: string;
    youtube: string;
    discord: string;
  };
  quickLinks: Website["theme"]["navbar"];
}) {
  const socialMediaArray = Object.entries(socialMedia).map(([key, value]) => {
    return {
      key,
      value,
    };
  });

  return (
    <div className="border-y w-full" id="server">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-x-12 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        {/* Company info section */}
        <div className="sm:col-span-2 lg:col-span-4 w-full flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6">
          <Image
            alt="Logo"
            loading="lazy"
            width={256}
            height={210}
            className="w-32 sm:w-36 lg:w-40"
            src={imageLinkGenerate(logoImage)}
          />
          <div className="text-sm max-w-xs sm:max-w-none">
            <span className="font-semibold">{description}</span>
          </div>
        </div>

        {/* Links sections */}
        <div className="sm:col-span-2 lg:col-span-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <span className="font-semibold text-sm sm:text-base">
              Hızlı Linkler
            </span>
            <div className="flex flex-col gap-y-2 [&_a]:text-xs sm:[&_a]:text-sm [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-primary mt-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.index}
                  href={item.url}
                  className="flex items-center gap-2 text-sm w-fit"
                >
                  {renderIcon(item.icon, 4, 4)}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <span className="font-semibold text-sm sm:text-base">Destek</span>
            <div className="flex flex-col gap-y-2 [&_a]:text-xs sm:[&_a]:text-sm [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-primary mt-2">
              <Link href="/help-center">Yardım Merkezi</Link>
              <Link href="/support">Destek Talebi</Link>
            </div>
          </div>

          {/* Corporate */}
          <div className="text-center sm:text-left">
            <span className="font-semibold text-sm sm:text-base">Kurumsal</span>
            <div className="flex flex-col gap-y-2 [&_a]:text-xs sm:[&_a]:text-sm [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-primary mt-2">
              <Link href="/legal/rules">Kurallar</Link>
              <Link href="/legal/privacy-policy">Gizlilik Politikası</Link>
              <Link href="/legal/terms">Hizmet Şartları</Link>
            </div>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <span className="font-semibold text-sm sm:text-base">Sosyal</span>
            <div className="flex flex-col gap-y-2 [&_a]:text-xs sm:[&_a]:text-sm [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-primary mt-2">
              {socialMediaArray.map((item) => (
                renderSocialIcon(item.key, item.value, item.key.charAt(0).toUpperCase() + item.key.slice(1), 4, 4)
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
