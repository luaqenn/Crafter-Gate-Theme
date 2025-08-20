"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ChestItemCard from "./chest-item-card";
import { ChestItem } from "@/lib/types/chest";
import { serverChestService } from "@/lib/api/services/chestService";
import { AuthContext } from "@/lib/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { chestService } from "@/lib/api/services/chestService";
import { alert } from "../ui/alerts";
import { useRouter } from "next/navigation";

export default function Chest() {
  const [chestItems, setChestItems] = useState<ChestItem[]>([]);
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const fetchChestItems = async () => {
      const chestItemsPromise = serverChestService().getChestItems(
        user?.id || ""
      );
      const items = await chestItemsPromise;
      setChestItems(items);
    };
    fetchChestItems();
  }, [user]);

  const handleUseItem = (itemId: string) => {
    chestService.useChestItem(user?.id || "", itemId).then((res) => {
      if (res.success) {
        setChestItems(
          chestItems.map((item) =>
            item.id === itemId ? { ...item, used: true } : item
          )
        );
      }
    });

    alert({
      title: "Başarılı",
      message: "Eşya başarıyla kullanıldı ve oyuna gönderildi.",
      type: "success",
      confirmText: "Tamam",
    });
  };

  if (!isAuthenticated && !isLoading) {
    router.push("/auth/sign-in?return=/chest");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sandığınızdaki Ürünler</CardTitle>
        <CardDescription>
          Sandığınızdaki ürünleri görüntüleyin veya kullanın.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chestItems.map((item) => (
            <ChestItemCard key={item.id} item={item} action={handleUseItem} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
