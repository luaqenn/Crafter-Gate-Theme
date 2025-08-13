"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { AuthContext } from "@/lib/context/AuthContext";
import { useContext } from "react";
import TurnstileWidget from "@/components/ui/turnstile-widget";
import { useRouter } from "next/navigation";

export default function SignInForm({
  bannerImage,
  logo,
  turnstilePublicKey,
}: {
  bannerImage: string;
  logo: string;
  turnstilePublicKey?: string;
}) {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on new submission
    
    if (turnstilePublicKey && !turnstileToken) {
      setError("Lütfen Turnstile doğrulamasını tamamlayın");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(username, password, turnstileToken, rememberMe);
      router.push("/home");
    } catch (error: any) {
      console.error("Sign in error:", error); // Debug için log
      
      // Backend'den gelen hata mesajını göster
      if (error?.message) {
        if (Array.isArray(error.message)) {
          // Validation errors için
          setError(error.message.join(", "));
        } else {
          // Single error message için
          setError(error.message);
        }
      } else if (error?.response?.data?.message) {
        // Axios error response'dan gelen message
        setError(error.response.data.message);
      } else {
        // Genel hata mesajı
        setError("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
    setTurnstileError(false);
    setError(null); // Turnstile doğrulandığında hatayı temizle
  };

  const handleTurnstileError = (error: Error) => {
    console.error("Turnstile error:", error);
    setTurnstileError(true);
    setError("Turnstile doğrulaması başarısız. Lütfen tekrar deneyin.");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${imageLinkGenerate(bannerImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden"
    >
      <Card className="relative w-full max-w-md bg-card/95 backdrop-blur-sm border-border shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Image
              src={imageLinkGenerate(logo)}
              alt="Logo"
              width={80}
              height={80}
              className="flex-shrink-0"
            />
            <div className="flex flex-col justify-center text-left">
              <CardTitle className="text-2xl font-bold text-foreground">
                Giriş Yap
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Hesabınıza giriş yapın ve oyuna devam edin
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Hata mesajı gösterimi */}
          {error && (
            <div className="flex items-start space-x-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Kullanıcı Adı
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null); // Input değiştiğinde hatayı temizle
                }}
                required
                className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Şifre
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null); // Input değiştiğinde hatayı temizle
                  }}
                  required
                  className="pr-10 border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-muted text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm text-foreground"
                >
                  Beni hatırla
                </Label>
              </div>
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-foreground p-0"
              >
                Şifremi unuttum?
              </Button>
            </div>

            {turnstilePublicKey && (
              <TurnstileWidget
                sitekey={turnstilePublicKey}
                onVerify={handleTurnstileVerify}
                onError={handleTurnstileError}
                hasError={turnstileError}
              />
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <Button
              variant="link"
              className="p-0 text-foreground hover:text-muted-foreground"
            >
              Kayıt ol
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
