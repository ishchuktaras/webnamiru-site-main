// app/(admin)/admin/inquiries/page.tsx

import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getInquiries() {
  const inquiries = await prisma.projectInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return inquiries;
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Poptávky z dotazníku</h1>
          <p className="text-gray-500 dark:text-gray-400">Přehled všech odeslaných strategických analýz.</p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Název Projektu</TableHead>
              <TableHead>Jméno Klienta</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Typ Projektu</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.projectName}</TableCell>
                <TableCell>{inquiry.clientName}</TableCell>
                <TableCell>{inquiry.clientEmail}</TableCell>
                <TableCell>{new Date(inquiry.createdAt).toLocaleDateString("cs-CZ")}</TableCell>
                <TableCell>
                    <Badge variant={inquiry.projectType === 'business' ? 'default' : 'secondary'}>
                        {inquiry.projectType === 'business' ? 'Byznys' : 'Neziskový'}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/inquiries/${inquiry.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}