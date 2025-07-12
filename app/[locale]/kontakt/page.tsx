import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactCard from '@/components/ContactCard';

// Přidejte překlady do vašich messages/{cs,en,uk}.json souborů
/*
"ContactPage": {
  "title": "Kontaktujte mě",
  "subtitle": "Máte dotaz nebo zájem o spolupráci? Neváhejte mě kontaktovat.",
  "phone": "Telefon",
  "email": "E-mail",
  "address": "Fakturační adresa"
}
*/

export default function KontaktPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('ContactPage');

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Phone className="mx-auto h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg">{t('phone')}</CardTitle>
            <p className="text-muted-foreground">+420 777 666 555</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Mail className="mx-auto h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg">{t('email')}</CardTitle>
            <p className="text-muted-foreground">taras@webnamiru.app</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <MapPin className="mx-auto h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg">{t('address')}</CardTitle>
            <p className="text-muted-foreground">Havlíčkův Brod, 580 01</p>
          </CardContent>
        </Card>
      </div>

      <ContactCard />
    </div>
  );
}