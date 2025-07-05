// components/emails/InquiryConfirmationEmail.tsx
import React from 'react';

interface InquiryConfirmationEmailProps {
  clientName: string;
  projectName: string;
}

export const InquiryConfirmationEmail: React.FC<InquiryConfirmationEmailProps> = ({ clientName, projectName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h2>Děkujeme za Váš zájem o projekt "{projectName}"</h2>
    <p>Dobrý den, {clientName},</p>
    <p>
      potvrzuji přijetí Vašeho strategického dotazníku. Děkuji za čas, který jste mu věnoval(a).
    </p>
    <p>
      Všechny Vaše odpovědi si pečlivě projdu a co nejdříve (obvykle do 48 hodin) se Vám ozvu s návrhem dalších kroků.
    </p>
    <p>S pozdravem,</p>
    <p>
      <strong>Taras Ishchuk</strong><br/>
      webnamiru.site
    </p>
  </div>
);