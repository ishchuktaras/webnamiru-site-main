// components/StrategicAnalysisEmbed.tsx
import React from 'react';

interface StrategicAnalysisEmbedProps {
  googleFormUrl: string; // URL tvého Google Formuláře
  onClose?: () => void; // Přidáme onClose, pokud bude uvnitř modalu s tlačítkem pro zavření
}

export function StrategicAnalysisEmbed({ googleFormUrl, onClose }: StrategicAnalysisEmbedProps) {
  return (
    <div className="w-full h-[600px] sm:h-[700px] lg:h-[800px] relative"> {/* Uprav výšku dle potřeby */}
      {/* Pokud bys chtěl tlačítko pro zavření uvnitř iframe, tak je to komplikovanější. Spíše se zavře celý modal. */}
      <iframe
        src={googleFormUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Strategická Analýza Web na míru"
        className="rounded-lg"
      >
        Načítání formuláře...
      </iframe>
    </div>
  );
}