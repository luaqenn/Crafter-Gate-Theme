"use client";

import Link from "next/link";
import { User, LogIn, Menu, X, User as ProfileIcon, Wallet, Package, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({
  websiteName,
  navbarLinks,
}: {
  websiteName: string;
  navbarLinks: Theme["navbar"];
}) => {
  const { isAuthenticated, user, signOut, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{websiteName}</span>
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
                <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
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
                    <DropdownMenuItem asChild>
                      <Link href="/" className="w-full">
                        Anasayfa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/magaza" className="w-full">
                        Mağaza
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blog" className="w-full">
                        Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/destek" className="w-full">
                        Destek
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/giris" className="w-full">
                        Giriş Yap
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/kayit" className="w-full">
                        Kayıt Ol
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Guard clause to ensure user data is properly loaded
  if (!isAuthenticated || !user) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{websiteName}</span>
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
                    <DropdownMenuItem asChild>
                      <Link href="/" className="w-full">
                        Anasayfa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/magaza" className="w-full">
                        Mağaza
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blog" className="w-full">
                        Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/destek" className="w-full">
                        Destek
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/giris" className="w-full">
                        Giriş Yap
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/kayit" className="w-full">
                        Kayıt Ol
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{websiteName}</span>
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
                    <DropdownMenuItem asChild>
                      <Link href="/" className="w-full">
                        Anasayfa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/magaza" className="w-full">
                        Mağaza
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blog" className="w-full">
                        Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/destek" className="w-full">
                        Destek
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/giris" className="w-full">
                        Giriş Yap
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/kayit" className="w-full">
                        Kayıt Ol
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>

                   {/* Hamburger Menu Overlay */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
