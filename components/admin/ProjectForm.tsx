// components/admin/ProjectForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

import {
  projectSchema,
  ActionReturnType,
  ZodFieldErrors,
} from '@/lib/actions/project.actions';

export type ProjectFormValues = z.infer<typeof projectSchema>;

type ProjectFormActionReturnType = ActionReturnType<typeof projectSchema>;

interface ProjectFormProps {
  action: (
    projectId: string | null, // Zde může být null
    prevState: any,
    formData: FormData
  ) => Promise<ProjectFormActionReturnType>;
  defaultValues?: ProjectFormValues;
  projectId?: string | null; // <-- ZDE ZMĚNA: Povolíme null
}

export default function ProjectForm({ action, defaultValues, projectId }: ProjectFormProps) {
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues || {
      name: '',
      clientName: '',
      clientEmail: '',
      status: 'Poptávka',
      price: null,
      description: null,
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('clientName', values.clientName);
    formData.append('clientEmail', values.clientEmail);
    formData.append('status', values.status);
    if (values.price !== null && values.price !== undefined) {
      formData.append('price', String(values.price));
    }
    if (values.description !== null && values.description !== undefined) {
      formData.append('description', values.description);
    }

    // Akci předáváme projectId, který může být string nebo null
    const result = await action(projectId || null, null, formData);

    if (result.success) {
      toast.success(result.message);
      router.push('/admin/projects');
    } else {
      if (result.errors) {
        form.clearErrors();
        for (const key in result.errors) {
          if (Object.prototype.hasOwnProperty.call(result.errors, key)) {
            const fieldErrors = result.errors[key as keyof ZodFieldErrors<typeof projectSchema>];
            if (fieldErrors && fieldErrors.length > 0) {
              form.setError(key as keyof ProjectFormValues, {
                type: 'server',
                message: fieldErrors[0],
              } as FieldError);
            }
          }
        }
      }
      toast.error(result.message || 'Došlo k chybě.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Název projektu</FormLabel>
              <FormControl>
                <Input placeholder="Název projektu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jméno klienta</FormLabel>
              <FormControl>
                <Input placeholder="Jméno klienta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email klienta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte status projektu" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Poptávka">Poptávka</SelectItem>
                  <SelectItem value="V realizaci">V realizaci</SelectItem>
                  <SelectItem value="Dokončeno">Dokončeno</SelectItem>
                  <SelectItem value="Zrušeno">Zrušeno</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena (Kč)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Např. 15000"
                  {...field}
                  value={field.value === null || field.value === undefined ? '' : field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? null : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popis projektu</FormLabel>
              <FormControl>
                <Textarea placeholder="Podrobný popis projektu..." {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{projectId ? 'Uložit změny' : 'Vytvořit projekt'}</Button>
      </form>
    </Form>
  );
}