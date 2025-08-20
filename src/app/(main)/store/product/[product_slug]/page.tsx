import { notFound } from "next/navigation";
import { serverProductsService } from "@/lib/api/services/productsService";
import { serverWebsiteService } from "@/lib/api/services/websiteService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { formatDate } from "@/lib/utils";
import {
  Package,
  Calendar,
  Tag,
  Server,
  Star,
  Clock,
  CreditCard,
} from "lucide-react";
import { serverServersService } from "@/lib/api/services/serversService";
import { serverCategoriesService } from "@/lib/api/services/categoriesService";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import ProductActionButtons from "@/components/ui/product-action-buttons";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    product_slug: string;
  }>;
}

export const generateMetadata = async ({ params }: { params: Promise<{ product_slug: string }> }): Promise<Metadata> => {
  const product = await serverProductsService().getProductById((await params).product_slug);
  return {
    title: product.name,
    description: product.description || "Ürün detayları",
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const productsService = serverProductsService();
  const websiteService = serverWebsiteService();

  try {
    const [product, website] = await Promise.all([
      productsService.getProductById((await params).product_slug),
      websiteService.getWebsite({
        id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
      }),
    ]);

    if (!product) {
      notFound();
    }

    const currency = website.currency;
    const server = await serverServersService().getServer(product.server_id);
    const category = await serverCategoriesService().getCategory(
      product.category
    );
    // Calculate discounted price
    const discountedPrice =
      product.discountValue > 0
        ? product.discountType === "percentage"
          ? product.price - (product.price * product.discountValue) / 100
          : product.price - product.discountValue
        : product.price;

    return (
      <div>
        {/* Breadcrumb */}
        <DefaultBreadcrumb
          items={[
            { label: "Mağaza", href: "/store" },
            {
              label: category.name,
              href: `/store/${server.slug}/${category.slug}`,
            },
            { label: product.name, href: `/store/product/${product.slug}` },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center p-8">
                  <Image
                    src={imageLinkGenerate(product.image)}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain object-center max-w-full max-h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {product.discountValue > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-foreground">
                        {discountedPrice.toFixed(2)} {currency}
                      </span>
                      <span className="text-xl text-muted-foreground line-through">
                        {product.price} {currency}
                      </span>
                      <Badge variant="destructive" className="text-sm">
                        {product.discountType === "percentage"
                          ? `%${product.discountValue} İndirim`
                          : `${product.discountValue} ${currency} İndirim`}
                      </Badge>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-foreground">
                      {product.price > 0
                        ? `${product.price} ${currency}`
                        : "Ücretsiz"}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Stok:
                </span>
                {product.stock === -1 ? (
                  <Badge variant="default" className="ml-2">
                    Sınırsız
                  </Badge>
                ) : product.stock > 0 ? (
                  <Badge variant="secondary" className="ml-2">
                    Mevcut
                  </Badge>
                ) : null}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <ProductActionButtons 
              product={product}
            />

            <Separator />

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ürün Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sunucu</p>
                      <p className="font-medium">
                        {server?.name || "Bilinmeyen"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Kategori</p>
                      <p className="font-medium">{category.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Eklenme Tarihi
                      </p>
                      <p className="font-medium">
                        {formatDate(product.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Güncellenme
                      </p>
                      <p className="font-medium">
                        {formatDate(product.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Etiketler</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Premium Kalite</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Anında Teslimat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Güvenli Ödeme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">7/24 Destek</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
