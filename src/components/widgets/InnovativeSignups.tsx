"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Signup {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: string;
  isNew?: boolean;
}

interface InnovativeSignupsProps {
  signups: Signup[];
}

export default function InnovativeSignups({ signups }: InnovativeSignupsProps) {
  if (!signups || signups.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Son Katılan Oyuncular
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Topluluğumuza yeni katılan oyuncuları keşfedin ve onlara hoş geldin deyin!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {signups.slice(0, 8).map((signup, index) => (
            <motion.div
              key={signup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
                        <AvatarImage 
                          src={`https://mc-heads.net/avatar/${signup.username}/128`}
                          alt={signup.username} 
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {signup.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {signup.isNew && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {signup.username}
                        </h3>
                        {signup.isNew && (
                          <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-0.5">
                            <Star className="w-3 h-3 mr-1" />
                            Yeni
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(signup.joinedAt).toLocaleDateString('tr-TR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {signups.length > 8 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Ve daha fazlası... Topluluğumuz her gün büyüyor! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}