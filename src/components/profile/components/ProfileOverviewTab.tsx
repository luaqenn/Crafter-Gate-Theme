"use client";

import React from "react";
import { User } from "@/lib/types/user";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface ProfileOverviewTabProps {
  user: User;
}

export function ProfileOverviewTab({ user }: ProfileOverviewTabProps) {
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: tr,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Kullanıcı Bilgileri</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rol:</span>
              <span>{user.role.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Üyelik:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
            {user.lastLogin && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Son Giriş:
                </span>
                <span>{formatDate(user.lastLogin)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">İstatistikler</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Toplam Mesaj:
              </span>
              <span>{user.messages?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Destek Talebi:
              </span>
              <span>{user.supportCount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Beğeni:</span>
              <span>{user.likes?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yorum:</span>
              <span>{user.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
