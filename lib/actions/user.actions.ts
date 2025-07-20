// lib/actions/user.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'

import prisma from '@/lib/prisma'
import { auth } from '@/auth' // Import vaší NextAuth konfigurace

// Definice typu pro data z formuláře
interface UserFormData {
  name: string;
  email: string;
  password?: string; // Heslo je volitelné pro případnou úpravu
  role: Role;
}

// Funkce pro vytvoření uživatele
export async function createUser(formData: UserFormData) {
  const session = await auth()
  // Kontrola, zda je přihlášený uživatel SuperAdmin
  if (session?.user?.role !== 'SUPERADMIN') {
    throw new Error('Nemáte oprávnění k provádění této akce.')
  }

  const { name, email, password, role } = formData

  if (!name || !email || !password || !role) {
    throw new Error('Všechna pole jsou povinná.')
  }

  // Kontrola, zda uživatel s daným e-mailem již neexistuje
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('Uživatel s tímto e-mailem již existuje.')
  }

  // Hashování hesla
  const hashedPassword = await hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Nepodařilo se vytvořit uživatele.')
  }

  // Vyčistí cache a obnoví data na stránce uživatelů
  revalidatePath('/admin/users')
  // Přesměruje na stránku se seznamem uživatelů
  redirect('/admin/users')
}

// Funkce pro získání všech uživatelů
export async function getUsers() {
    const session = await auth()
    if (session?.user?.role !== 'SUPERADMIN') {
        return []; // Nebo hodit chybu
    }
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
}