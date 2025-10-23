// components/emails/ConsultationConfirmationEmail.tsx
import { Html, Head, Body, Container, Text, Heading, Section, Hr } from "@react-email/components";
import * as React from "react";

interface ConsultationConfirmationEmailProps {
  name: string;
  email: string;
  message: string;
  preferredDate?: string;
}

export const ConsultationConfirmationEmail: React.FC<ConsultationConfirmationEmailProps> = ({
  name,
  email,
  message,
  preferredDate,
}) => (
  <Html lang="cs">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Děkujeme za váš zájem o konzultaci, {name}!</Heading>
        <Text style={paragraph}>
          Potvrzujeme přijetí vašeho požadavku na konzultaci.
        </Text>

        <Section style={detailsSection}>
          <Heading as="h2" style={h2}>Souhrn vašeho požadavku:</Heading>
          <Text style={detailText}><strong>Jméno:</strong> {name}</Text>
          <Text style={detailText}><strong>E-mail:</strong> {email}</Text>
          {preferredDate && <Text style={detailText}><strong>Preferovaný termín:</strong> {preferredDate}</Text>}
          <Text style={detailText}><strong>Co chcete probrat:</strong> {message}</Text>
        </Section>

        <Text style={paragraph}>
          Ozveme se vám co nejdříve k domluvě konkrétního termínu, který bude vyhovovat oběma stranám.
        </Text>
        <Text style={paragraph}>
          S pozdravem,
          <br />
          Taras Ishchuk
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

export default ConsultationConfirmationEmail;