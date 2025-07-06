import AboutMeContent from "@/components/about-me-content"
import Footer from "@/components/Footer" // Import patičky

export default function AboutMePage() {
  return (
    <main>
      <AboutMeContent />
      <Footer /> {/* Přidání patičky na stránku O mně */}
    </main>
  )
}
