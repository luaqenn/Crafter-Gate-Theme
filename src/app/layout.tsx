import "./globals.css";
import { serverWebsiteService } from "@/lib/api/services/websiteService";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import PWARegister from "@/components/pwa-register";
import { FloatingPWAButton } from "@/components/ui/pwa-install-button";

export async function generateMetadata() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });
  return {
    title: {
      template: `%s | ${website.name}`,
      default: `${website.name}`,
    },
    icons: {
      icon: imageLinkGenerate(website.favicon),
      shortcut: imageLinkGenerate(website.favicon),
    },
    description: website.description,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: website.name,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export async function generateViewport() {
  return {
    themeColor: "#000000",
    colorScheme: "light dark",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });
  const pathname = headersList.get("x-current-path");

  if (pathname === "/") {
    redirect("/home");
  }

  return (
    <html lang="en" className="glide-scroll antialiased">
      <body className="glide-scroll antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers logo={website.image}>{children}</Providers>
          <PWARegister />
          <FloatingPWAButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
