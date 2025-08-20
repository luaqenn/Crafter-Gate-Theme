import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import Chest from "@/components/chest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandık",
  description: "Sandığınızdaki eşyaları görüntüleyin veya kullanın.",
};

export default async function ChestPage() {
  return (
    <div>
      <DefaultBreadcrumb items={[{ label: "Sandığım", href: "/chest" }]} />
      <Chest />
    </div>
  );
}
