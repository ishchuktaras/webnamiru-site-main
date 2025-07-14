// components/admin/tabs/OfferTab.tsx
"use client";

import React, { useActionState, useEffect, useState } from "react";
import { createOrUpdateOffer } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Offer, type Project } from "@prisma/client";
import { toast } from "sonner";
import { format } from 'date-fns';
import { PlusCircle, Trash2, Loader2, FileText } from "lucide-react";

interface OfferTabProps {
  project: Project & { offer: Offer | null };
}

type ScopeItem = { id: number; text: string };
type PriceItem = { id: number; description: string; price: number };

export default function OfferTab({ project }: OfferTabProps) {
  const [state, formAction, isPending] = useActionState(createOrUpdateOffer, { success: false, message: "" });
  
  // Stavy pro dynamické položky
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>(project.offer?.scope_items as ScopeItem[] || [{ id: 1, text: "" }]);
  const [priceItems, setPriceItems] = useState<PriceItem[]>(project.offer?.price_items as PriceItem[] || [{ id: 1, description: "", price: 0 }]);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Uloženo!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  const handleAddItem = (type: 'scope' | 'price') => {
    if (type === 'scope') {
      setScopeItems([...scopeItems, { id: Date.now(), text: "" }]);
    } else {
      setPriceItems([...priceItems, { id: Date.now(), description: "", price: 0 }]);
    }
  };

  const handleRemoveItem = (type: 'scope' | 'price', id: number) => {
    if (type === 'scope') {
      setScopeItems(scopeItems.filter(item => item.id !== id));
    } else {
      setPriceItems(priceItems.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (type: 'scope' | 'price', id: number, field: string, value: string | number) => {
    if (type === 'scope') {
      setScopeItems(scopeItems.map(item => item.id === id ? { ...item, text: value as string } : item));
    } else {
      setPriceItems(priceItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  const calculateTotalPrice = () => {
    return priceItems.reduce((total, item) => total + Number(item.price || 0), 0);
  };

  const defaultDate = project.offer?.validUntil ? format(new Date(project.offer.validUntil), 'yyyy-MM-dd') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText />Správa nabídky</CardTitle>
        <CardDescription>
          Vytvořte detailní nabídku na míru podle vaší šablony. Formulář umožňuje flexibilní úpravy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="scope_items" value={JSON.stringify(scopeItems)} />
          <input type="hidden" name="price_items" value={JSON.stringify(priceItems)} />
          <input type="hidden" name="price_total" value={calculateTotalPrice()} />

          <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4']} className="w-full">
            
            {/* ZÁKLADNÍ ÚDAJE */}
            <AccordionItem value="item-1">
              <AccordionTrigger>Základní údaje</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="offerNumber">Číslo nabídky</Label>
                    <Input id="offerNumber" name="offerNumber" defaultValue={project.offer?.offerNumber || ""} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="validUntil">Platnost do</Label>
                    <Input id="validUntil" name="validUntil" type="date" defaultValue={defaultDate} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status nabídky</Label>
                  <Select name="status" defaultValue={project.offer?.status || "Koncept"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Koncept">Koncept</SelectItem>
                      <SelectItem value="Odesláno">Odesláno</SelectItem>
                      <SelectItem value="Přijato">Přijato</SelectItem>
                      <SelectItem value="Zamítnuto">Zamítnuto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SHRNUTÍ PROJEKTU */}
            <AccordionItem value="item-2">
              <AccordionTrigger>Shrnutí projektu a cíle</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                 <div className="space-y-1">
                    <Label htmlFor="summary">Text shrnutí</Label>
                    <Textarea id="summary" name="summary" rows={4} placeholder="Cílem projektu je vytvořit..." defaultValue={project.offer?.summary || ""} />
                  </div>
              </AccordionContent>
            </AccordionItem>

            {/* ROZSAH PRACÍ */}
            <AccordionItem value="item-3">
              <AccordionTrigger>Rozsah prací a specifikace</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-1">
                  <Label htmlFor="scope_package">Název balíčku (volitelné)</Label>
                  <Input id="scope_package" name="scope_package" placeholder="např. Viditelný Podnik" defaultValue={project.offer?.scope_package || ""} />
                </div>
                <Label>Položky rozsahu prací</Label>
                <div className="space-y-2">
                  {scopeItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Input value={item.text} onChange={(e) => handleItemChange('scope', item.id, 'text', e.target.value)} placeholder={`Položka ${index + 1}`} />
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveItem('scope', item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleAddItem('scope')}><PlusCircle className="mr-2 h-4 w-4" />Přidat položku</Button>
              </AccordionContent>
            </AccordionItem>
            
            {/* CENOVÁ KALKULACE */}
            <AccordionItem value="item-4">
              <AccordionTrigger>Cenová kalkulace</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <Label>Položky ceníku</Label>
                <div className="space-y-2">
                  {priceItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_150px_auto] gap-2 items-center">
                      <Input value={item.description} onChange={(e) => handleItemChange('price', item.id, 'description', e.target.value)} placeholder={`Popis položky ${index + 1}`} />
                      <Input value={item.price} onChange={(e) => handleItemChange('price', item.id, 'price', e.target.value)} type="number" placeholder="Cena v Kč" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveItem('price', item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleAddItem('price')}><PlusCircle className="mr-2 h-4 w-4" />Přidat položku ceny</Button>
                <div className="flex justify-end items-center pt-4 border-t">
                    <span className="text-lg font-bold">Celková cena: {calculateTotalPrice().toLocaleString('cs-CZ')} Kč</span>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="fileUrl">Odkaz na finální PDF soubor nabídky (volitelné)</Label>
            <Input id="fileUrl" name="fileUrl" type="url" placeholder="https://..." defaultValue={project.offer?.fileUrl || ""} />
          </div>

          <Button type="submit" disabled={isPending} size="lg">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            {project.offer ? "Aktualizovat nabídku" : "Vytvořit nabídku"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
