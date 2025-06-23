import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, ArrowLeft } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-900 p-4 text-center">
      <div className="max-w-2xl space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Případová studie se připravuje!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tento projekt je ve stavu dokončování a brzy bude k dispozici s plnými detaily. Děkujeme za vaši trpělivost!
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Mezitím nás sledujte na sociálních sítích, abyste nezmeškali novinky a další zajímavé projekty:
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="https://www.facebook.com/profile.php?id=61577408540223"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </Button>
          </Link>
          <Link href="https://www.instagram.com/webnamiru/" target="_blank" rel="noopener noreferrer" passHref>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 text-purple-600 border-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900/20"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </Button>
          </Link>
        </div>
        <Link href="/pripadove-studie" passHref>
          <Button
            variant="ghost"
            className="mt-8 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na přehled případových studií
          </Button>
        </Link>
      </div>
    </div>
  )
}
