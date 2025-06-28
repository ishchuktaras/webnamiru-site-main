import { Mail } from "lucide-react"; // Ikonu si bude brát jako props

// Přijímá ikonu jako komponentu (Icon), nadpis (title) a obsah (children)
export function ContactCard({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="text-gray-600 dark:text-gray-400 space-y-2">
        {children}
      </div>
    </div>
  );
}