"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, ShoppingCart } from "lucide-react";
import Purchase from "@/lib/helpers/purchase";
import { Product } from "@/lib/types/product";
import { alert } from "./alerts";
import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

interface ProductActionButtonsProps {
  product: Product;
}

export default function ProductActionButtons({
  product,
}: ProductActionButtonsProps) {
  const { addItem, getItemCount, openCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handlePurchase = () => {
    alert({
      title: "Satın Al",
      message: "Satın almak istediğinize emin misiniz?",
      confirmText: "Satın Al",
      cancelText: "İptal",
      autoClose: false,
      showCancel: true,
      onConfirm: () => Purchase({ product }),
    });
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Add item to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      serverId: product.server_id,
      categoryId: product.category,
    });

    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false);
      openCart();
    }, 500);
  };

  // Check if item is already in cart
  const itemCount = getItemCount();
  const isInCart = itemCount > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        size="lg"
        className="flex-1 bg-primary hover:bg-primary/90"
        onClick={handlePurchase}
        disabled={product.stock === 0}
      >
        <CreditCard className="w-4 h-4 mr-2" />
        Hemen Satın Al
      </Button>
      <Button
        size="lg"
        variant={isInCart ? "default" : "outline"}
        className="flex-1"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAddingToCart}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {isAddingToCart ? (
          "Ekleniyor..."
        ) : isInCart ? (
          `Sepette (${itemCount})`
        ) : (
          "Sepete Ekle"
        )}
      </Button>
    </div>
  );
}
