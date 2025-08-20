import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChestItem } from "@/lib/types/chest";

export default function ChestItemCard({ item, action }: { item: ChestItem, action: (itemId: string) => void }) {
  return (
    <Card className="flex flex-row items-center justify-between p-4 gap-4">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={imageLinkGenerate(item.product.image)}
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{item.product.name}</h3>
          <p className="text-sm text-gray-500">{item.product.description}</p>
        </div>
      </div>
      <Button 
        onClick={() => action(item.id)}
        variant="default"
        size="sm"
        className="shrink-0"
        disabled={item.used}
      >
        {item.used ? "Kullanıldı" : "Eşyayı Kullan"}
      </Button>
    </Card>
  );
}
