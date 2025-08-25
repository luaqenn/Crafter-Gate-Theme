import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, TrendingUp, Clock, Star, Flame } from 'lucide-react';
import { GetPostsParams } from '@/lib/types/posts';

interface SidebarProps {
  onFiltersChange: (filters: GetPostsParams) => void;
  currentFilters: GetPostsParams;
  className?: string;
  onMobileApply?: () => void;
}

const postTypes = [
  { value: 'news', label: 'Haberler', icon: TrendingUp },
  { value: 'announcement', label: 'Duyurular', icon: Clock },
  { value: 'blog', label: 'Blog Yazıları', icon: Star },
  { value: 'update', label: 'Güncellemeler', icon: Flame },
];

const sortOptions = [
  { value: 'createdAt', label: 'Oluşturulma Tarihi' },
  { value: 'updatedAt', label: 'Güncellenme Tarihi' },
  { value: 'title', label: 'Başlık' },
  { value: 'viewCount', label: 'Görüntülenme' },
  { value: 'likeCount', label: 'Beğeni' },
];

export default function Sidebar({ onFiltersChange, currentFilters, className, onMobileApply }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [selectedType, setSelectedType] = useState(currentFilters.type || '');
  const [selectedSort, setSelectedSort] = useState(currentFilters.sortBy || 'createdAt');
  const [sortOrder, setSortOrder] = useState(currentFilters.sortOrder || 'desc');

  const handleSearch = () => {
    onFiltersChange({
      ...currentFilters,
      search: searchTerm,
      page: 1, // Reset to first page when searching
    });
  };

  const handleTypeChange = (type: string) => {
    const newType = type === selectedType ? '' : type;
    setSelectedType(newType);
    onFiltersChange({
      ...currentFilters,
      type: newType as 'news' | 'announcement' | 'blog' | 'update' | undefined,
      page: 1,
    });
  };

  const handleSortChange = (sortBy: string) => {
    const typedSortBy = sortBy as 'createdAt' | 'updatedAt' | 'title' | 'viewCount' | 'likeCount';
    setSelectedSort(typedSortBy);
    onFiltersChange({
      ...currentFilters,
      sortBy: typedSortBy,
      page: 1,
    });
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order as 'asc' | 'desc');
    onFiltersChange({
      ...currentFilters,
      sortOrder: order as 'asc' | 'desc',
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedSort('createdAt');
    setSortOrder('desc');
    onFiltersChange({
      page: 1,
      limit: currentFilters.limit,
    });
  };

  const hasActiveFilters = searchTerm || selectedType || selectedSort !== 'createdAt' || sortOrder !== 'desc';

  return (
    <div className={className}>
      <Card className="xl:block">
        <CardHeader className="xl:block hidden">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
          </CardTitle>
          <CardDescription>
            Gönderileri filtrelemek ve sıralamak için seçenekleri kullanın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Arama</label>
            <div className="flex gap-2">
              <Input
                placeholder="Gönderi ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSearch} className="shrink-0">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Post Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gönderi Türü</label>
            <div className="flex flex-wrap gap-2">
              {postTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.value;
                return (
                  <Button
                    key={type.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeChange(type.value)}
                    className="h-8 px-2 text-xs"
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    <span className="truncate">{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sıralama</label>
            <Select value={selectedSort} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sıralama Yönü</label>
            <div className="flex gap-2">
              <Button
                variant={sortOrder === 'desc' ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortOrderChange('desc')}
                className="flex-1"
              >
                Azalan
              </Button>
              <Button
                variant={sortOrder === 'asc' ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortOrderChange('asc')}
                className="flex-1"
              >
                Artan
              </Button>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <Separator />
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
                size="sm"
              >
                Filtreleri Temizle
              </Button>
            </>
          )}

          {/* Mobile Apply Button */}
          {onMobileApply && (
            <div className="xl:hidden">
              <Separator className="my-4" />
              <Button
                onClick={onMobileApply}
                className="w-full"
                size="sm"
              >
                Filtreleri Uygula
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Hızlı Filtreler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => onFiltersChange({ ...currentFilters, pinnedOnly: true, page: 1 })}
          >
            <Star className="w-4 h-4 mr-2" />
            Sabitlenmiş Gönderiler
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => onFiltersChange({ ...currentFilters, hotOnly: true, page: 1 })}
          >
            <Flame className="w-4 h-4 mr-2" />
            Popüler Gönderiler
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
