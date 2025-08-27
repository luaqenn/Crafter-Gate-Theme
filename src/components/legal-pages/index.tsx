"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LexicalViewer from "@/lib/helpers/lexicalViewer";

interface LegalPageProps {
  title: string;
  content: any; // Lexical JSON content
  description?: string;
  lastUpdated?: string;
  className?: string;
}

export default function LegalPage({
  title,
  content,
  description,
  lastUpdated,
  className,
}: LegalPageProps) {
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {lastUpdated && (
          <p className="text-xs text-muted-foreground">
            Son güncelleme: {lastUpdated}
          </p>
        )}
      </div>

      {/* Content Card */}
      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <LexicalViewer 
            content={content || null} 
            className="prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:leading-7 prose-p:text-foreground prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-strong:font-semibold prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-mono prose-blockquote:border-l-2 prose-blockquote:border-l-primary prose-blockquote:pl-6 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground"
          />
        </CardContent>
      </Card>
    </div>
  );
}
