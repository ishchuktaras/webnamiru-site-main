import { getLocale, getTranslations } from "next-intl/server";
import AboutMeContent from "./about-me-content";

export default async function AboutMeSection() {
  const locale = await getLocale();
  const t = await getTranslations('AboutMeSection');
  const data = await import(`../lib/data.${locale}`);
  
  // Tento "obal" načte data a překlady a předá je klientské komponentě
  return <AboutMeContent t={t} data={data} />;
}