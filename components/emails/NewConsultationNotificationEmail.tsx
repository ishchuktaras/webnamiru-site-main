// components/emails/NewConsultationNotificationEmail.tsx
import { Html, Head, Body, Container, Text, Heading, Section, Hr, Button } from "@react-email/components";
import * as React from "react";

interface NewConsultationNotificationEmailProps {
  name: string;
  email: string;
  message: string;
  preferredDate?: string;
  submissionId: string;
}

export const NewConsultationNotificationEmail: React.FC<NewConsultationNotificationEmailProps> = ({
  name,
  email,
  message,
  preferredDate,
  submissionId,
}) => (
  <Html lang="cs">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nový požadavek na konzultaci!</Heading>
        <Text style={paragraph}>
          Právě dorazil nový požadavek na konzultaci od klienta.
        </Text>

        <Section style={detailsSection}>
          <Heading as="h2" style={h2}>Detaily požadavku:</Heading>
          <Text style={detailText}><strong>ID poptávky:</strong> {submissionId}</Text>
          <Text style={detailText}><strong>Jméno:</strong> {name}</Text>
          <Text style={detailText}><strong>E-mail:</strong> {email}</Text>
          {preferredDate && <Text style={detailText}><strong>Preferovaný termín:</strong> {preferredDate}</Text>}
          <Text style={detailText}><strong>Co chce probrat:</strong> {message}</Text>
        </Section>

        <Section style={{ textAlign: 'center', marginTop: '30px' }}>
          {/* Odkaz na admin rozhraní pro správu poptávek, pokud máš */}
          <Button style={button} href={`https://www.webnamiru.site/admin/contacts/${submissionId}`}>
            Zobrazit v administraci
          </Button>
        </Section>

        <Text style={paragraph}>
          S pozdravem,
          <br />
          Váš web
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Web na míru | Taras Ishchuk</Text>
      </Container>
    </Body>
  </Html>
);

const main = { /* ... stejné styly jako v ContactConfirmationEmail.tsx ... */ };
const container = { /* ... */ };
const h1 = { /* ... */ };
const h2 = { /* ... */ };
const paragraph = { /* ... */ };
const hr = { /* ... */ };
const footer = { /* ... */ };
const detailsSection = {
    backgroundColor: '#f6f6f6',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    marginBottom: '20px',
};
const detailText = {
    fontSize: '14px',
    color: '#333',
    lineHeight: '20px',
    margin: '0',
};
const button = {
    backgroundColor: '#007bff', // Změň barvu tlačítka dle potřeby
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold' as 'bold',
};

export default NewConsultationNotificationEmail;