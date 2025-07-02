// components/AffiliateLinkCard.tsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AffiliateLinkCardProps {
  title: string;
  description: string;
  link: string;
  buttonText: string;
  imageUrl: string; 
  partnerName: string;
}

export default function AffiliateLinkCard({ 
  title, 
  description, 
  link, 
  buttonText, 
  imageUrl, 
  partnerName 
}: AffiliateLinkCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
            <Image 
                src={imageUrl}
                alt={`Logo ${partnerName}`}
                width={120}
                height={40}
                className="object-contain"
            />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-sm mb-4">
            {description}
        </CardDescription>
        <Button asChild className="w-full group">
          <Link href={link} target="_blank" rel="noopener noreferrer sponsored">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}