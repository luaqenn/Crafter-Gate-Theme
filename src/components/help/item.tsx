"use client";

import type { HelpItem } from "@/lib/types/help";
import Title from "../ui/title";
import LexicalViewer from "@/lib/helpers/lexicalViewer";
import { DefaultBreadcrumb } from "../ui/breadcrumb";
import { Separator } from "../ui/separator";

export default function HelpItem({ item }: { item: HelpItem }) {
  return (
    <div className="space-y-6">
      <DefaultBreadcrumb
        items={[
          { label: "Yardım Merkezi", href: "/help" },
          { label: item.title, href: `/help/${item.id}` },
        ]}
      />
      <Title title={item.title} description={`Yardım kategorisine ait içeriği görüyorsunuz.`} />
      <Separator />
      <div className="prose dark:prose-invert max-w-none bg-primary/10 p-4 rounded-lg">
        <LexicalViewer content={item.content} />
      </div>
    </div>
  );
}
