// app/(admin)/admin/users/new/_components/UserForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Role } from '@prisma/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createUser } from '@/lib/actions/user.actions'

// Schema pro validaci formuláře pomocí Zod
const formSchema = z.object({
  name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky.'),
  email: z.string().email('Neplatný formát e-mailu.'),
  password: z.string().min(8, 'Heslo musí mít alespoň 8 znaků.'),
  role: z.nativeEnum(Role),
})

export function UserForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: Role.EDITOR, // Výchozí role
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser(values)
      toast.success('Uživatel byl úspěšně vytvořen.')
      // Přesměrování proběhne v server action, ale pro jistotu můžeme i zde
      router.push('/admin/users')
    } catch (error) {
      toast.error((error as Error).message || 'Něco se pokazilo.')
    }
  }
  
  // Funkce pro vygenerování náhodného hesla
  const generateRandomPassword = () => {
    const password = Math.random().toString(36).slice(-10);
    form.setValue('password', password);
    toast.info('Bylo vygenerováno nové dočasné heslo. Nezapomeňte si ho zkopírovat.')
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jméno a příjmení</FormLabel>
              <FormControl>
                <Input placeholder="Jan Novák" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="j.novak@email.cz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heslo</FormLabel>
              <FormControl>
                  <div className="flex gap-2">
                    <Input type="text" placeholder="Dočasné heslo" {...field} />
                    <Button type="button" variant="outline" onClick={generateRandomPassword}>
                      Generovat
                    </Button>
                  </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte roli" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Role).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Vytvářím...' : 'Vytvořit uživatele'}
        </Button>
      </form>
    </Form>
  )
}