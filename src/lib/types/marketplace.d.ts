export type Coupon = {
  id: string;
  code: string;
  type: "product_discount" | "cart_discount" | "free_product";
  minCartValue: null | number;
  productId: null | string;
  discountValue: number;
  discountType: "percentage" | "fixed";
  freeProductId: null | string;
  isActive: boolean;
};

export type MarketplaceSettings = {
  bulkDiscount: {
    type: "percentage" | "fixed";
    amount: number;
    expireDate: string | null;
    products: string[];
  } | null;
};
