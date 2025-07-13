// components/admin/tabs/InvoicesTab.tsx
"use client";

import { useState, useActionState, useEffect, useTransition } from "react";
import { createInvoice, updateInvoiceStatus } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Invoice, type Project } from "@prisma/client";
import { toast } from "sonner";
import { format } from 'date-fns';
import { PlusCircle, Check, X, Hourglass } from "lucide-react";

interface InvoicesTabProps {
  project: Project & { invoices: Invoice[] };
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Zaplaceno': return <Badge className="bg-green-500 text-white hover:bg-green-600"><Check className="mr-1 h-3 w-3" />Zaplaceno</Badge>;
        case 'Po splatnosti': return <Badge variant="destructive"><X className="mr-1 h-3 w-3" />Po splatnosti</Badge>;
        default: return <Badge variant="outline"><Hourglass className="mr-1 h-3 w-3" />Nezaplaceno</Badge>;
    }
};

export default function InvoicesTab({ project }: InvoicesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createInvoice, { success: false, message: "" });
  const [isStatusPending, startStatusTransition] = useTransition();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Hotovo!", { description: state.message });
        setIsDialogOpen(false);
      } else {
        toast.error("Chyba!", { description: state.message || "Zkontrolujte prosím vyplněná pole." });
      }
    }
  }, [state]);

  const handleStatusChange = (invoiceId: string, status: string) => {
    startStatusTransition(async () => {
        const result = await updateInvoiceStatus(invoiceId, status);
        if (result.success) {
            toast.success("Status aktualizován", { description: result.message });
        } else {
            toast.error("Chyba", { description: result.message });
        }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Správa faktur</CardTitle>
            <CardDescription>Evidujte zálohové a finální faktury pro tento projekt.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" />Nová faktura</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Vytvořit novou fakturu</DialogTitle>
                    <DialogDescription>Vyplňte údaje pro novou fakturu.</DialogDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="projectId" value={project.id} />
                    <div className="space-y-2">
                        <Label htmlFor="invoiceNumber">Číslo faktury</Label>
                        <Input id="invoiceNumber" name="invoiceNumber" required />
                        {state.errors?.invoiceNumber && <p className="text-sm text-red-500">{state.errors.invoiceNumber}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Částka (Kč)</Label>
                        <Input id="amount" name="amount" type="number" step="0.01" required />
                        {state.errors?.amount && <p className="text-sm text-red-500">{state.errors.amount}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Datum splatnosti</Label>
                        <Input id="dueDate" name="dueDate" type="date" required />
                        {state.errors?.dueDate && <p className="text-sm text-red-500">{state.errors.dueDate}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Typ faktury</Label>
                        <Select name="type" defaultValue="Zálohová">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="Zálohová">Zálohová</SelectItem><SelectItem value="Finální">Finální</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <input type="hidden" name="status" value="Nezaplaceno" />
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="ghost">Zrušit</Button></DialogClose>
                        <Button type="submit" disabled={isPending}>{isPending ? "Vytvářím..." : "Vytvořit fakturu"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Číslo faktury</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Částka</TableHead>
                    <TableHead>Splatnost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Akce</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {project.invoices?.length > 0 ? project.invoices.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>{invoice.amount.toLocaleString('cs-CZ')} Kč</TableCell>
                        <TableCell>{format(new Date(invoice.dueDate), 'd. M. yyyy')}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                            {invoice.status !== 'Zaplaceno' && (
                                <Button size="sm" onClick={() => handleStatusChange(invoice.id, 'Zaplaceno')} disabled={isStatusPending}>
                                    Označit jako zaplaceno
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow><TableCell colSpan={6} className="text-center h-24">Zatím nebyly vytvořeny žádné faktury.</TableCell></TableRow>
                )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
