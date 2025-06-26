import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDescription: string;
  package: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, phone, company, projectDescription, "package": servicePackage
}) => (
  <div>
    <h1>Nová poptávka z webu webnamiru.site!</h1>
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { "package": servicePackage, name, email, phone, company, projectDescription } = body;

    const { data, error } = await resend.emails.send({
      // DŮLEŽITÉ: Toto musí být e-mail z domény, kterou jsi ověřil v Resend.
      // Např. 'noreply@webnamiru.site' nebo 'kontakt@webnamiru.site'
      from: 'WebNaMiru.site <poptavka@webnamiru.site>', 
      
      // E-mail, kam chceš dostávat poptávky.
      // Pokud nemáš ověřenou doménu, MUSÍ to být e-mail, kterým ses registroval do Resend.
      to: ['poptavka@webnamiru.site'], 
      
      subject: `Nová poptávka na balíček: ${servicePackage}`,
      
      // Přidáme e-mail zákazníka do pole pro odpověď pro snadnější komunikaci
      replyTo: email,

      react: <EmailTemplate {...body} />,
    });

    // VYLEPŠENÉ LOGOVÁNÍ CHYB
    if (error) {
      // Vypíšeme si přesnou chybu od Resendu do konzole serveru
      console.error("Chyba od Resend API:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán!', data });

  } catch (error) {
    console.error("Interní chyba serveru:", error);
    return NextResponse.json({ message: 'Něco se pokazilo na serveru.' }, { status: 500 });
  }
}
