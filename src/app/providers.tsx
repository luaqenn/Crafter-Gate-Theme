import { AuthProvider } from "@/lib/context/AuthContext";

export default function Providers({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: string;
}) {
  return <AuthProvider logo={logo}>{children}</AuthProvider>;
}
