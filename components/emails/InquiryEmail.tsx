// components/emails/InquiryEmail.tsx

import React from 'react';

interface InquiryEmailProps {
  projectName: string;
  clientName: string;
  answers: Record<string, string>;
}

const sectionTitles: Record<string, string> = {
    brandStory: "Příběh značky",
    brandValues: "Hodnoty značky",
    brandVoice: "Osobnost značky",
    kpis: "Vybrané klíčové ukazatele (KPIs)",
    targetAudience: "Cílový zákazník/podporovatel",
    userPainPoints: "Problémy a motivace zákazníka",
    competitors: "Konkurence / Podobné organizace",
    usp: "Unikátní prodejní nabídka",
    inspirations: "Inspirativní weby",
    mustHaveFeatures: "Nezbytné funkce",
    mustHaveFeaturesOther: "Upřesnění dalších funkcí",
    contentProvider: "Dodání obsahu",
    budgetRange: "Odhadovaný rozpočet",
};

export function InquiryEmail({ projectName, clientName, answers }: InquiryEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#0056b3' }}>Strategická analýza pro projekt: {projectName}</h1>
      <p>Dobrý den, {clientName},</p>
      <p>děkuji za Váš čas a za vyplnění strategického dotazníku. Níže naleznete souhrn Vašich odpovědí, který bude sloužit jako základ pro naši další spolupráci.</p>
      <hr style={{ margin: '20px 0', borderColor: '#cccccc' }} />

      {Object.entries(sectionTitles).map(([key, title]) => {
        const value = answers[key];
        if (!value) return null;

        return (
          <div key={key} style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#0056b3', margin: '0 0 5px 0' }}>{title}</h3>
            <p style={{ margin: '0', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>{value}</p>
          </div>
        );
      })}

      <hr style={{ margin: '20px 0', borderColor: '#cccccc' }} />
      <p>V nejbližší době se Vám ozvu, abychom probrali další kroky.</p>
      <p>S pozdravem,</p>
      <p><strong>Taras Ishchuk</strong><br/>webnamiru.site</p>
    </div>
  );
}