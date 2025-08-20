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
  Plus,
  Minus,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    state: cartState,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getTotal,
    getItemCount,
    purchaseItems,
    openCart,
    closeCart,
    isCartOpen,
  } = useCart();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Expose openCart function to parent components
  useImperativeHandle(ref, () => ({
    openCart,
  }));

  // Auto-open cart when items are added
  const prevItemCount = useRef(cartState.items.length);

  useEffect(() => {
    if (cartState.items.length > prevItemCount.current) {
      // New item was added, open cart
      openCart();
    }
    prevItemCount.current = cartState.items.length;
  }, [cartState.items.length, openCart]);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    await applyCoupon(couponCode);
    setIsApplyingCoupon(false);
  };

  const handlePurchase = async () => {
    if (!user) return;

    // Mock user balance - replace with actual user balance from context
    const userBalance = 100; // This should come from user context

    const result = await purchaseItems(userBalance);
    if (result.type === "success") {
      closeCart();
      router.push("/chest");
      // Show success message
    } else if (result.type === "insufficient_balance") {
      router.push("/wallet");
    }
  };

  const getPaymentButtonText = () => {
    if (!user) return "Giriş Yap";

    // Mock user balance - replace with actual user balance from context
    const userBalance = 100; // This should come from user context
    const total = getTotal();

    if (userBalance >= total) {
      return "Satın Al";
    } else {
      return "Kredi Yükle";
    }
  };

  const getPaymentButtonAction = () => {
    if (!user) {
      return () => (window.location.href = "/auth/sign-in");
    }

    // Mock user balance - replace with actual user balance from context
    const userBalance = 100; // This should come from user context
    const total = getTotal();

    if (userBalance >= total) {
      return handlePurchase;
    } else {
      return () => (window.location.href = "/wallet"); // Navigate to wallet/recharge page
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isCartOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeCart}
        />

        {/* Cart Panel - Soldan sağa */}
        <div
          className={`absolute left-0 top-0 h-full w-96 bg-background border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out ${
            isCartOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Sepetim</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartState.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Sepetiniz boş</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartState.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-medium">
                        {item.price * item.quantity}₺
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coupon Section */}
          {cartState.items.length > 0 && (
            <div className="border-t border-border p-6">
              <div className="space-y-3">
                <h3 className="font-medium">İndirim Kuponu</h3>
                {cartState.coupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        {cartState.coupon.code}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {cartState.coupon.discountType === "percentage"
                          ? `%${cartState.coupon.discountValue} indirim`
                          : `${cartState.coupon.discountValue}₺ indirim`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeCoupon}
                      className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Kupon kodu girin"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                    >
                      {isApplyingCoupon ? "..." : "Uygula"}
                    </Button>
                  </div>
                )}
                {cartState.error && (
                  <p className="text-sm text-destructive">{cartState.error}</p>
                )}
              </div>
            </div>
          )}

          {/* Cart Footer */}
          {cartState.items.length > 0 && (
            <div className="border-t border-border p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Ara Toplam:</span>
                  <span>{getSubtotal()}₺</span>
                </div>
                {cartState.coupon && (
                  <div className="flex items-center justify-between text-sm text-green-600 dark:text-green-400">
                    <span>İndirim:</span>
                    <span>-{getDiscount()}₺</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-semibold border-t border-border pt-2">
                  <span>Toplam:</span>
                  <span>{getTotal()}₺</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={getPaymentButtonAction()}
                disabled={cartState.isLoading}
              >
                {cartState.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>İşleniyor...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>{getPaymentButtonText()}</span>
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

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
