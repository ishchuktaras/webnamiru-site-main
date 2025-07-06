// components/admin/SendEmailButton.tsx

"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendInquiryToClient } from "@/app/(admin)/admin/inquiries/actions";

export function SendEmailButton({ inquiryId }: { inquiryId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const result = await sendInquiryToClient(inquiryId);
            if (result.success) {
                toast.success("Odesláno!", { description: result.message });
            } else {
                toast.error("Chyba!", { description: result.message });
            }
        });
    };

    return (
        <Button onClick={handleClick} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            {isPending ? 'Odesílám...' : 'Poslat souhrn klientovi'}
        </Button>
    );
}