"use client";

import { Product } from "@/lib/types/product";
import { Card, CardContent } from "../card";
import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { Button } from "../button";
import Link from "next/link";
import { AuthContext } from "@/lib/context/AuthContext";
import { useContext } from "react";

type ProductCardProps = {
  product: Product;
  currency: string;
};

export default function ProductCard({ product, currency }: ProductCardProps) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="rounded-lg border text-card-foreground shadow-xs w-full relative overflow-hidden bg-secondary/20">
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
        <small className="text-sm font-medium leading-none">
          {product.discountValue > 0 ? (
            <>
              <span className="line-through mr-2 text-muted-foreground">
                {product.price} {currency}
              </span>
              {product.discountType === "percentage"
                ? (
                    product.price -
                    (product.price * product.discountValue) / 100
                  ).toFixed(0)
                : (product.price - product.discountValue).toFixed(0)}{" "}
              {currency}
            </>
          ) : (
            <span>
              {product.price > 0 ? `${product.price} ${currency}` : "Ücretsiz"}
            </span>
          )}
        </small>

        {isAuthenticated ? (
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              Hemen Satın Al
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              Sepete Ekle
            </Button>
          </div>
        ) : (
          <Link href={`/auth/sign-in?return=${window.location.href}`}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              Giriş Yap
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
