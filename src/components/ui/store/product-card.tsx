"use client";

import { Product } from "@/lib/types/product";
import { Card, CardContent } from "../card";
import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { Button } from "../button";
import Link from "next/link";
import { AuthContext } from "@/lib/context/AuthContext";
import { useContext } from "react";
import { BulkDiscount } from "@/lib/types/marketplace";
import ProductActionButtons from "../product-action-buttons";

type ProductCardProps = {
  product: Product;
  currency: string;
  bulkDiscount: BulkDiscount | null;
};

export default function ProductCard({
  product,
  currency,
  bulkDiscount,
}: ProductCardProps) {
  const { isAuthenticated } = useContext(AuthContext);

  // Calculate total discount by combining product discount and bulk discount
  const calculateDiscountedPrice = () => {
    let currentPrice = product.price;
    let totalDiscount = 0;
    let discountDetails = [];

    // Apply product discount first
    if (product.discountValue > 0) {
      let productDiscount = 0;
      if (product.discountType === "percentage") {
        // Percentage discount is applied to current price
        productDiscount = (currentPrice * product.discountValue) / 100;
        discountDetails.push({
          type: "percentage",
          value: product.discountValue,
          amount: productDiscount,
          source: "product"
        });
      } else {
        // Fixed discount is a flat amount
        productDiscount = product.discountValue;
        discountDetails.push({
          type: "fixed",
          value: product.discountValue,
          amount: productDiscount,
          source: "product"
        });
      }
      currentPrice -= productDiscount;
      totalDiscount += productDiscount;
    }

    // Apply bulk discount to the already-discounted price
    if (
      bulkDiscount &&
      (bulkDiscount.products.includes(product.id) || bulkDiscount.products.length === 0)
    ) {
      let bulkDiscountAmount = 0;
      if (bulkDiscount.type === "percentage") {
        // Percentage bulk discount applied to current (discounted) price
        bulkDiscountAmount = (currentPrice * bulkDiscount.amount) / 100;
        discountDetails.push({
          type: "percentage",
          value: bulkDiscount.amount,
          amount: bulkDiscountAmount,
          source: "bulk"
        });
      } else {
        // Fixed bulk discount is a flat amount
        bulkDiscountAmount = bulkDiscount.amount;
        discountDetails.push({
          type: "fixed",
          value: bulkDiscount.amount,
          amount: bulkDiscountAmount,
          source: "bulk"
        });
      }
      currentPrice -= bulkDiscountAmount;
      totalDiscount += bulkDiscountAmount;
    }

    return {
      finalPrice: Math.max(0, currentPrice),
      hasDiscount: totalDiscount > 0,
      totalDiscount,
      discountDetails,
      originalPrice: product.price,
    };
  };

  const { finalPrice, hasDiscount, totalDiscount, discountDetails, originalPrice } =
    calculateDiscountedPrice();

  // Calculate total discount percentage for display
  const totalDiscountPercentage = originalPrice > 0 
    ? Math.round((totalDiscount / originalPrice) * 100) 
    : 0;

  return (
    <div className="rounded-lg border text-card-foreground shadow-xs w-full relative overflow-hidden bg-secondary/20">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{totalDiscountPercentage}%
          </div>
        </div>
      )}

      <Link href={`/store/product/${product.slug}`}>
        <div className="w-full aspect-[7/4] bg-secondary flex items-center justify-center p-4">
          <Image
            src={imageLinkGenerate(product.image)}
            alt={product.name}
            width={160}
            height={160}
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="w-full border-b py-3 px-6">
          <span className="font-semibold text-white tracking-wider">
            {product.name}
          </span>
        </div>
      </Link>

      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          {hasDiscount ? (
            <>
              <div className="flex items-center gap-2">
                <span className="line-through text-muted-foreground text-sm">
                  {originalPrice} {currency}
                </span>
                <span className="text-primary font-semibold text-lg">
                  {finalPrice.toFixed(2)} {currency}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {discountDetails.map((detail, index) => (
                  <span key={index} className="inline-block">
                    {detail.source === "product" ? "Ürün: " : "Toplu: "}
                    {detail.type === "percentage" 
                      ? `%${detail.value} indirim` 
                      : `${detail.value} ${currency} indirim`
                    }
                    {index < discountDetails.length - 1 && (
                      <span className="mx-1 text-primary">+</span>
                    )}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <span className="text-lg font-semibold">
              {product.price > 0 ? `${product.price} ${currency}` : "Ücretsiz"}
            </span>
          )}
        </div>

        <ProductActionButtons
          product={product}
          isCard={true}
        />
      </div>
    </div>
  );
}
