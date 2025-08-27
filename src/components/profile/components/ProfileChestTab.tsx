"use client";

import React from "react";
import { User } from "@/lib/types/user";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import imageLinkGenerate from "@/lib/helpers/imageLinkGenerate";

interface ProfileChestTabProps {
  user: User;
}

export function ProfileChestTab({ user }: ProfileChestTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sandık Eşyaları</h3>
      {user.chest && user.chest.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.chest.map((item, index) => (
            <Card key={index} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {item.product.image ? (
                      <img
                        src={imageLinkGenerate(item.product.image)}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      "📦"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.product.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.used ? "Kullanıldı" : "Kullanılmadı"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          Henüz sandık eşyası yok
        </div>
      )}
    </div>
  );
}
