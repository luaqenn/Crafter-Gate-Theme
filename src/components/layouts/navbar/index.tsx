"use client";

import Link from "next/link";
import {
  User,
  LogIn,
  Menu,
  X,
  User as ProfileIcon,
  Wallet,
  Package,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { Theme, Website } from "@/lib/types/website";
import {
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Cart from "./components/cart";

export interface NavbarRef {
  openCart: () => void;
}

const Navbar = forwardRef<
  NavbarRef,
  {
    websiteName: string;
    navbarLinks: Theme["navbar"];
  }
>(({ websiteName, navbarLinks }, ref) => {
  const { isAuthenticated, user, signOut, isLoading } = useContext(AuthContext);
  const {
    getItemCount,
    openCart,
    closeCart,
    isCartOpen,
  } = useCart();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  // Expose openCart function to parent components
  useImperativeHandle(ref, () => ({
    openCart,
  }));

  // Auto-open cart when items are added
  const prevItemCount = useRef(getItemCount());

  useEffect(() => {
    prevItemCount.current = getItemCount();
  }, [getItemCount]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <Link href="/home" className="cursor-pointer">
                  <span className="text-2xl font-bold">{websiteName}</span>
                </Link>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    {navbarLinks.map((link) => (
                      <NavigationMenuItem key={link.index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.url}
                            className={navigationMenuTriggerStyle()}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Right side - Buttons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <ThemeSwitcher />

                {/* Cart Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 relative"
                  onClick={openCart}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sepet</span>
                  {getItemCount() > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {getItemCount()}
                    </Badge>
                  )}
                </Button>

                {/* Loading State */}
                {isLoading && (
                  <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
                )}

                {/* Unauthenticated State */}
                {!isLoading && !isAuthenticated && (
                  <>
                    <Link href="/auth/sign-in">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Giriş Yap</span>
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Kayıt Ol</span>
                      </Button>
                    </Link>
                  </>
                )}

                {/* Authenticated State */}
                {!isLoading && isAuthenticated && user && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={`https://mc-heads.net/avatar/${user.username}/256`}
                      />
                    </Avatar>
                    <span>{user.username}</span>
                  </Button>
                )}
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {navbarLinks.map((link) => (
                      <DropdownMenuItem key={link.index} asChild>
                        <Link href={link.url} className="w-full">
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    {/* Cart in mobile menu */}
                    <DropdownMenuItem onClick={openCart}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Sepet ({getItemCount()})
                    </DropdownMenuItem>
                    {!isLoading && !isAuthenticated && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/auth/sign-in" className="w-full">
                            Giriş Yap
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/auth/sign-up" className="w-full">
                            Kayıt Ol
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Overlay - Soldan sağa doğru açılır */}
      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
      />

      {/* Hamburger Menu Overlay - Only show when authenticated and menu is open */}
      {isAuthenticated && user && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-80 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Hesap Menüsü</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={`https://mc-heads.net/avatar/${user.username}/256`}
                  />
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">Oyuncu</p>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Profilim */}
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                  onClick={() => {
                    // Navigate to profile
                    setIsMenuOpen(false);
                    router.push("/profile");
                  }}
                >
                  <ProfileIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">Profilim</span>
                </Button>

                {/* Cüzdanım */}
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                  onClick={() => {
                    // Navigate to wallet
                    setIsMenuOpen(false);
                    router.push("/wallet");
                  }}
                >
                  <Wallet className="h-6 w-6" />
                  <span className="text-sm font-medium">Cüzdanım</span>
                </Button>

                {/* Sandığım */}
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                  onClick={() => {
                    // Navigate to chest
                    setIsMenuOpen(false);
                    router.push("/chest");
                  }}
                >
                  <Package className="h-6 w-6" />
                  <span className="text-sm font-medium">Sandığım</span>
                </Button>

                {/* Ayarlar */}
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                  onClick={() => {
                    // Navigate to settings
                    setIsMenuOpen(false);
                    router.push("/settings");
                  }}
                >
                  <Settings className="h-6 w-6" />
                  <span className="text-sm font-medium">Ayarlar</span>
                </Button>
              </div>

              {/* Çıkış Yap Button */}
              <div className="mt-6">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 h-4 mr-2" />
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Navbar;
