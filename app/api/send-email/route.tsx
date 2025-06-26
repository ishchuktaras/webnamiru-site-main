import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

// Vytvoření instance Resend s API klíčem z .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// Komponenta pro e-mailovou šablonu
interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectDescription: string;
  package: string; // Změna z servicePackage na package, aby odpovídalo datům z formuláře
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, phone, company, projectDescription, "package": servicePackage
}) => (
  <div>
    <h1>Nová poptávka z webu webnamiru.site!</h1>
    <p><strong>Balíček:</strong> {servicePackage}</p>
    <p><strong>Jméno:</strong> {name}</p>
    <p><strong>E-mail:</strong> {email}</p>
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
    
    // Destrukturace s přejmenováním `package` na `servicePackage`, aby se předešlo konfliktu s klíčovým slovem
    const { "package": servicePackage, name, email, phone, company, projectDescription } = body;

    const { data, error } = await resend.emails.send({
      from: 'WebNaMiru.site <poptavka@webnamiru.site>', // MUSÍ být e-mail z tvojí ověřené domény!
      to: ['poptavka@webnamiru.site'], // E-mail, kam chceš dostávat poptávky
      subject: `Nová poptávka na balíček: ${servicePackage}`,
      // 👇👇👇 TOTO JE KLÍČOVÁ OPRAVA 👇👇👇
      // Použijeme komponentu jako JSX značku, ne jako volání funkce
      react: <EmailTemplate 
                name={name} 
                email={email} 
                phone={phone} 
                company={company} 
                projectDescription={projectDescription}
                package={servicePackage} 
             />,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán!', data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Něco se pokazilo.' }, { status: 500 });
  }
}
