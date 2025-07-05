// components/emails/InquiryEmail.tsx

import React from 'react';

interface InquiryEmailProps {
  projectName: string;
  clientName: string;
  answers: Record<string, string>;
}

const sectionTitles: Record<string, string> = {
    clientName: "Jméno klienta",
    clientEmail: "Kontaktní e-mail",
    projectName: "Název projektu",
    projectType: "Typ projektu",
    mainGoal: "Hlavní cíl projektu",
    mainGoalOther: "Upřesnění hlavního cíle",
    kpis: "Vybrané klíčové ukazatele (KPIs)",
    targetAudience: "Cílový zákazník/podporovatel",
    userPainPoints: "Problémy a motivace zákazníka",
    usp: "Unikátní prodejní nabídka",
    competitors: "Konkurence / Podobné organizace",
    inspirations: "Inspirativní weby",
    mustHaveFeatures: "Nezbytné funkce",
    mustHaveFeaturesOther: "Upřesnění dalších funkcí",
    contentProvider: "Dodání obsahu",
    budgetRange: "Odhadovaný rozpočet",
    brandStory: "Příběh značky",
    brandValues: "Hodnoty značky",
    brandVoice: "Osobnost značky",
};

export const InquiryEmail: React.FC<InquiryEmailProps> = ({ projectName, clientName, answers }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', padding: '20px' }}>
    <h1 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>
      Strategická analýza pro projekt: {projectName}
    </h1>
    <p>Dobrý den, {clientName},</p>
    <p>
      děkuji za Váš čas a za vyplnění strategického dotazníku. Níže naleznete souhrn Vašich odpovědí, který bude sloužit jako základ pro naši další spolupráci.
    </p>
    <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

    {Object.entries(sectionTitles).map(([key, title]) => {
      const value = answers[key];
      // Zobrazíme pole, i když je prázdné, aby byl přehled kompletní, ale můžeme ho označit.
      if (value === undefined || value === null) return null;

      return (
        <div key={key} style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#0056b3', margin: '0 0 8px 0', fontSize: '16px' }}>{title}</h3>
          <p style={{ margin: '0', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px', whiteSpace: 'pre-wrap', borderLeft: '3px solid #007bff' }}>
            {value || <span style={{color: '#888'}}><i>(Nevyplněno)</i></span>}
          </p>
        </div>
      );
    })}

    <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />
    <p>V nejbližší době se Vám ozvu, abychom probrali další kroky.</p>
    <p>S pozdravem,</p>
    <p>
      <strong>Taras Ishchuk</strong><br/>
      webnamiru.site
    </p>
  </div>
);