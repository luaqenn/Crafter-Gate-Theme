import { Server } from "@/lib/types/server";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import Image from "next/image";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

type StoreCardProps = {
  name: string;
  image: string;
  slug: string;
  redirectUrl: string;
};

export default async function StoreCard({ name, image, slug, redirectUrl }: StoreCardProps) {
  return (
    <Link href={redirectUrl}>
      <Card className="rounded-lg border bg-card text-card-foreground shadow-xs w-full overflow-hidden p-0 m-0 gap-0 py-0">
        <div className="w-full aspect-[11/5] relative">
          <Image
            src={imageLinkGenerate(image)}
            alt={name}
            fill
            className="opacity-70 object-cover aspect-[11/5]"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center py-0">
            <h2 className="scroll-m-20 text-3xl tracking-tight font-bold">
              {name}
            </h2>
          </div>
        </div>

        <div className="border-t h-16 w-full px-8 flex items-center justify-between">
          <span className="font-semibold">{name}</span>

          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 cursor-pointer"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
