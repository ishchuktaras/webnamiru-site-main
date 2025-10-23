// components/emails/ContactConfirmationEmail.tsx
import { Html, Head, Body, Container, Text, Heading, Section, Hr, Button } from "@react-email/components";
import * as React from "react";

interface ContactConfirmationEmailProps {
  name: string;
  email: string;
  message: string;
  inquiryType: string;
}

export const ContactConfirmationEmail: React.FC<ContactConfirmationEmailProps> = ({
  name,
  email,
  message,
  inquiryType,
}) => (
  <Html lang="cs">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Děkujeme za vaši poptávku, {name}!</Heading>
        <Text style={paragraph}>
          Potvrzujeme přijetí vaší nezávazné poptávky.
        </Text>

        <Section style={detailsSection}>
          <Heading as="h2" style={h2}>Souhrn vaší zprávy:</Heading>
          <Text style={detailText}><strong>Jméno:</strong> {name}</Text>
          <Text style={detailText}><strong>E-mail:</strong> {email}</Text>
          <Text style={detailText}><strong>Typ poptávky:</strong> {inquiryType}</Text>
          <Text style={detailText}><strong>Zpráva:</strong> {message}</Text>
        </Section>

        <Text style={paragraph}>
          Brzy se vám ozveme s konkrétními návrhy a dalším postupem. Obvykle to trvá do 2 pracovních dnů.
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

const main = { /* ... stejné styly jako předtím ... */ };
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

export default ContactConfirmationEmail;