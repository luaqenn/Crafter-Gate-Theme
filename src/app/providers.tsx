import { AuthProvider } from "@/lib/context/AuthContext";
import { CartProvider } from "@/lib/context/CartContext";
import { WebsiteProvider } from "@/lib/context/WebsiteContext";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";

export default function Providers({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: string;
}) {
  return (
    <WebsiteProvider>
      <AuthProvider logo={logo}>
        <CartProvider>
          {children}
          <Toaster />
          <HotToaster />
        </CartProvider>
      </AuthProvider>
    </WebsiteProvider>
  );
}
