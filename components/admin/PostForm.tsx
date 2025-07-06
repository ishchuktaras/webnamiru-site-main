// components/admin/PostForm.tsx

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post, Category, Tag } from "@prisma/client";
import { createPost, updatePost } from "@/lib/actions/postActions"; // OPRAVA
import { useTransition } from "react";

const postSchema = z.object({
  title: z.string().min(1, "Nadpis je povinný."),
  content: z.string().min(1, "Obsah je povinný."),
  slug: z.string().min(1, "URL slug je povinný."),
  excerpt: z.string().optional(),
  imageUrl: z.string().url({ message: "Neplatná URL adresa." }).optional().or(z.literal('')),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post & { categoryIds?: string[]; tagIds?: string[] };
  allCategories: Category[];
  allTags: Tag[];
}

export default function PostForm({ post, allCategories, allTags }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      imageUrl: post?.imageUrl || "",
      published: post?.published || false,
      featured: post?.featured || false,
      categoryIds: post?.categoryIds || [],
      tagIds: post?.tagIds || [],
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
      } else if (value != null) {
          formData.append(key, String(value));
      }
    });

    if (post) {
      formData.append('id', post.id);
    }
    
    startTransition(async () => {
      const result = post 
        ? await updatePost(formData) 
        : await createPost(formData);

      if (result?.success) {
        toast.success(post ? "Článek upraven" : "Článek vytvořen");
        router.push('/admin/posts');
        router.refresh();
      } else if (result?.message) {
        toast.error("Chyba!", { description: result.message });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Nadpis</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>URL Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="excerpt" render={({ field }) => (<FormItem><FormLabel>Perex</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="content" render={({ field }) => (<FormItem><FormLabel>Obsah</FormLabel><FormControl><Textarea {...field} rows={15} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>URL obrázku</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        
        <FormItem>
          <FormLabel>Kategorie</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allCategories.map((category) => (
              <FormField
              key={category.id}
              control={form.control}
              name="categoryIds"
              render={({ field }) => {
                  return (
                  <FormItem
                      key={category.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                  >
                      <FormControl>
                      <Checkbox
                          checked={field.value?.includes(category.id)}
                          onCheckedChange={(checked) => {
                          return checked
                              ? field.onChange([...(field.value || []), category.id])
                              : field.onChange(
                                  field.value?.filter(
                                  (value) => value !== category.id
                                  )
                              )
                          }}
                      />
                      </FormControl>
                      <FormLabel className="font-normal">
                      {category.name}
                      </FormLabel>
                  </FormItem>
                  )
              }}
              />
          ))}
          </div>
          <FormMessage />
        </FormItem>

        <div className="flex items-center space-x-2">
            <FormField control={form.control} name="published" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Publikovat</FormLabel></div></FormItem>)} />
            <FormField control={form.control} name="featured" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Doporučený</FormLabel></div></FormItem>)} />
        </div>
        
        <Button type="submit" disabled={isPending}>
          {isPending ? "Ukládám..." : (post ? "Uložit změny" : "Vytvořit článek")}
        </Button>
      </form>
    </Form>
  );
}