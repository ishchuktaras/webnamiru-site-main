// components/InquirySheet.tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';


interface InquirySheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  serviceInfo?: string;
}

export default function InquirySheet({
  trigger,
  title,
  description,
  serviceInfo,
}: InquirySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {/* Toto volání je teď 100% správné */}
          
        </div>
      </SheetContent>
    </Sheet>
  );
}