"use client";

import React, { useState } from "react";
import { User, WallMessage } from "@/lib/types/user";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface ProfileWallTabProps {
  user: User;
  wallMessages: WallMessage[];
  onSendMessage: (message: string) => Promise<void>;
  onReplyMessage: (messageId: string, reply: string) => Promise<void>;
}

export function ProfileWallTab({ 
  user, 
  wallMessages, 
  onSendMessage, 
  onReplyMessage 
}: ProfileWallTabProps) {
  const [newMessage, setNewMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: tr,
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await onSendMessage(newMessage);
      setNewMessage("");
    } catch (err) {
      // Hata yönetimi parent component'te yapılıyor
    }
  };

  const handleReplyMessage = async (messageId: string) => {
    if (!replyMessage.trim()) return;
    
    try {
      await onReplyMessage(messageId, replyMessage);
      setReplyMessage("");
      setReplyingTo(null);
    } catch (err) {
      // Hata yönetimi parent component'te yapılıyor
    }
  };

  const startReply = (messageId: string) => {
    setReplyingTo(messageId);
    setReplyMessage("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyMessage("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Duvar Mesajları</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            document.getElementById("new-message")?.focus()
          }
        >
          Mesaj Yaz
        </Button>
      </div>

      {/* New Message Input */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex gap-2">
            <input
              id="new-message"
              type="text"
              placeholder="Bu kullanıcının duvarına mesaj yazın..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              onKeyPress={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              Gönder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wall Messages */}
      <div className="space-y-4">
        {wallMessages.length > 0 ? (
          wallMessages.map((message) => (
            <Card key={message.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://mc-heads.net/avatar/${message.sender.username}/256`}
                      alt={message.sender.username}
                    />
                    <AvatarFallback className="text-xs">
                      {message.sender.username
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {message.sender.username}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          backgroundColor:
                            message.sender.role.color + "20",
                          borderColor: message.sender.role.color,
                          color: message.sender.role.color,
                        }}
                      >
                        {message.sender.role.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>

                    <div className="text-sm">{message.content}</div>

                    {/* Reply Button */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startReply(message.id)}
                        className="text-xs h-6 px-2"
                      >
                        Yanıtla
                      </Button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === message.id && (
                      <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Yanıtınızı yazın..."
                            value={replyMessage}
                            onChange={(e) =>
                              setReplyMessage(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              handleReplyMessage(message.id)
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() =>
                              handleReplyMessage(message.id)
                            }
                            disabled={!replyMessage.trim()}
                            className="h-8 px-3"
                          >
                            Yanıtla
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={cancelReply}
                            className="h-8 px-3"
                          >
                            İptal
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {message.replies && message.replies.length > 0 && (
                      <div className="ml-6 space-y-2 mt-3">
                        <Separator />
                        {message.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-2"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={`https://mc-heads.net/avatar/${reply.sender.username}/256`}
                                alt={reply.sender.username}
                              />
                              <AvatarFallback className="text-xs">
                                {reply.sender.username
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-xs">
                                  {reply.sender.username}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>
                              <div className="text-xs mt-1">
                                {reply.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Henüz duvar mesajı yok
          </div>
        )}
      </div>
    </div>
  );
}
