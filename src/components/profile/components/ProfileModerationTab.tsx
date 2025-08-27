"use client";

import React, { useState } from "react";
import { User } from "@/lib/types/user";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface ProfileModerationTabProps {
  user: User;
  onBanUser: (reason: string) => Promise<void>;
  onUnbanUser: () => Promise<void>;
}

export function ProfileModerationTab({ 
  user, 
  onBanUser, 
  onUnbanUser 
}: ProfileModerationTabProps) {
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState("");

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: tr,
    });
  };

  const handleBanUser = async () => {
    if (!banReason.trim()) return;
    
    try {
      await onBanUser(banReason);
      setBanDialogOpen(false);
      setBanReason("");
    } catch (err) {
      // Hata yönetimi parent component'te yapılıyor
    }
  };

  const handleUnbanUser = async () => {
    try {
      await onUnbanUser();
    } catch (err) {
      // Hata yönetimi parent component'te yapılıyor
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Moderasyon İşlemleri</h3>
      
      {/* Kullanıcı Durumu */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Kullanıcı Durumu:</span>
              <Badge 
                variant={user.banned ? "destructive" : "default"}
              >
                {user.banned ? "Banlandı" : "Aktif"}
              </Badge>
            </div>
            
            {user.banned && user.bannedBy && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Banlayan:</span>
                  <span>{user.bannedBy.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ban Tarihi:</span>
                  <span>{formatDate(user.bannedAt || "")}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ban İşlemi */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="space-y-3">
            <h4 className="font-medium">Kullanıcı Yönetimi</h4>
            <div className="space-y-2">
              {!user.banned ? (
                <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                    >
                      Kullanıcıyı Banla
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Kullanıcıyı Banla</DialogTitle>
                      <DialogDescription>
                        Bu kullanıcıyı banlamak için sebep belirtin.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ban-reason">Ban Sebebi</Label>
                        <Textarea
                          id="ban-reason"
                          placeholder="Ban sebebini yazın..."
                          value={banReason}
                          onChange={(e) => setBanReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setBanDialogOpen(false)}
                      >
                        İptal
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleBanUser}
                        disabled={!banReason.trim()}
                      >
                        Banla
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  onClick={handleUnbanUser}
                >
                  Banı Kaldır
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kullanıcı İstatistikleri */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="space-y-3">
            <h4 className="font-medium">Detaylı İstatistikler</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Toplam Mesaj:</span>
                  <span>{user.messages?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destek Talebi:</span>
                  <span>{user.supportCount || 0}</span>
                </div>
              </div>
              <div className="space-y-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
