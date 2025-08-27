import { AuthProvider } from "@/lib/context/AuthContext";
import { CartProvider } from "@/lib/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: string;
}) {
  return (
    <AuthProvider logo={logo}>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}
