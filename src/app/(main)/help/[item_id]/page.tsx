import HelpItem from "@/components/help/item";
import { helpService } from "@/lib/api/services/helpService";
import { lexicalToString } from "@/lib/helpers/lexicalToString";

export async function generateMetadata({ params }: { params: Promise<{ item_id: string }> }) {
  const item = await helpService.getItem({ itemId: (await params).item_id });
  return {
    title: item.title,
    description: lexicalToString(item.content),
  };
}

export default async function HelpItemPage({ params }: { params: Promise<{ item_id: string }> }) {
  const item = await helpService.getItem({ itemId: (await params).item_id });
  return <HelpItem item={item} />;
}