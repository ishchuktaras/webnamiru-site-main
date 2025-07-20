// app/(admin)/admin/users/new/page.tsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { UserForm } from '@/app/(admin)/admin/users/new/_components/UserForm' 

export default function NewUserPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vytvořit nového uživatele</CardTitle>
        <CardDescription>
          Vyplňte údaje pro nového člena týmu. Po vytvoření mu můžete poslat vygenerované heslo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  )
}