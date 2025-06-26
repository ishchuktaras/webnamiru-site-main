import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Šablona pro Poptávku Služeb ---
interface ServiceEmailProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDescription: string;
  package: string;
}

const ServiceEmailTemplate: React.FC<Readonly<ServiceEmailProps>> = ({ name, email, phone, company, projectDescription, "package": servicePackage }) => (
  <div>
    <h1>Nová poptávka na služby z webu!</h1>
    <p><strong>Balíček:</strong> {servicePackage}</p>
    <p><strong>Jméno:</strong> {name}</p>
    <p><strong>E-mail (odpovědět na):</strong> {email}</p>
    <p><strong>Telefon:</strong> {phone}</p>
    <p><strong>Firma:</strong> {company || 'Neuvedeno'}</p>
    <hr />
    <h2>Popis projektu:</h2>
    <p>{projectDescription}</p>
  </div>
);

// --- Šablona pro Zájem o Partnerství ---
interface PartnershipEmailProps {
    name: string;
    email: string;
    phone: string;
    portfolio: string;
    reason: string;
    package: string;
}

const PartnershipEmailTemplate: React.FC<Readonly<PartnershipEmailProps>> = ({ name, email, phone, portfolio, reason, "package": partnershipPackage }) => (
    <div>
        <h1>Nový zájem o partnerství z webu!</h1>
        <p><strong>Typ partnerství:</strong> {partnershipPackage}</p>
        <p><strong>Jméno / Firma:</strong> {name}</p>
        <p><strong>E-mail (odpovědět na):</strong> {email}</p>
        <p><strong>Telefon:</strong> {phone}</p>
        <p><strong>Portfolio:</strong> <a href={portfolio}>{portfolio}</a></p>
        <hr />
        <h2>Důvod zájmu o spolupráci:</h2>
        <p>{reason}</p>
    </div>
);


// --- Hlavní API Funkce ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let emailComponent;
    let subject;

    // Rozpoznání typu formuláře podle unikátních polí
    if ('projectDescription' in body) {
      // Toto je poptávka služeb
      subject = `Nová poptávka na balíček: ${body.package}`;
      emailComponent = <ServiceEmailTemplate {...body as ServiceEmailProps} />;
    } else if ('reason' in body) {
      // Toto je zájem o partnerství
      subject = `Nový zájem o partnerství: ${body.package}`;
      emailComponent = <PartnershipEmailTemplate {...body as PartnershipEmailProps} />;
    } else {
      // Neznámý typ dat
      return NextResponse.json({ message: "Neznámý formát dat." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'WebNaMiru.site <poptavka@webnamiru.site>',
      to: ['poptavka@webnamiru.site'],
      replyTo: body.email,
      subject: subject,
      react: emailComponent,
    });

    if (error) {
      console.error("Chyba od Resend API:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán!', data });

  } catch (error) {
    console.error("Interní chyba serveru:", error);
    return NextResponse.json({ message: 'Něco se pokazilo na serveru.' }, { status: 500 });
  }
}
