// components/emails/NewInquiryNotificationEmail.tsx
import React from 'react';

interface NewInquiryNotificationEmailProps {
  inquiryId: string;
  projectName: string;
  clientName: string;
  clientEmail: string;
}

export const NewInquiryNotificationEmail: React.FC<NewInquiryNotificationEmailProps> = ({
  inquiryId,
  projectName,
  clientName,
  clientEmail
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h2>Nová poptávka z webu webnamiru.site!</h2>
    <p>Právě byl odeslán nový strategický dotazník.</p>
    <ul>
      <li><strong>Projekt:</strong> {projectName}</li>
      <li><strong>Klient:</strong> {clientName} ({clientEmail})</li>
    </ul>
    <p>
      Pro zobrazení detailů a všech odpovědí, klikni na následující odkaz:
    </p>
    <a 
      href={`https://webnamiru.site/admin/inquiries/${inquiryId}`}
      style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#007bff', color: '#ffffff', textDecoration: 'none', borderRadius: '5px' }}
    >
      Zobrazit detail poptávky
    </a>
    <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
      Toto je automatická notifikace.
    </p>
  </div>
);