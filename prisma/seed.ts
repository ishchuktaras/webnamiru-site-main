// prisma/seed.ts

import { PrismaClient, Role } from "@prisma/client";
import { blogPosts, blogCategories } from "../lib/blog-data";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

async function main() {
  console.log("Start seeding...");

  // 1. Vymažeme stará data pro čistý start
  console.log("Clearing previous data...");
  await prisma.comment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.blogView.deleteMany({});
  await prisma.contactSubmission.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Previous data cleared.");

  // 2. Vytvoření SuperAdmin uživatele
  console.log("Creating SuperAdmin user...");
  const password = "_?Cdj,jlf";
  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = await prisma.user.create({
    data: {
      email: "ishchuktaras@gmail.com",
      name: "Taras Ishchuk (SuperAdmin)",
      password: hashedPassword,
      role: Role.SUPERADMIN,
    },
  });
  console.log(`SuperAdmin user created: ${superAdmin.name}`);

  // Vytvoření dalších uživatelů pro testování
  console.log("Creating additional users for testing...");
  const editorPassword = await bcrypt.hash("editorpassword", 10);
  const editor = await prisma.user.create({
    data: {
      email: "copywriter@webnamiru.site",
      name: "Karel Novák (Copywriter)",
      password: editorPassword,
      role: Role.EDITOR, // Role pro copywritera
    },
  });
  console.log(`Editor user created: ${editor.name}`);

  const marketerPassword = await bcrypt.hash("marketerpassword", 10);
  const marketer = await prisma.user.create({
    data: {
      email: "marketolog@webnamiru.site",
      name: "Jana Svobodová (Marketolog)",
      password: marketerPassword,
      role: Role.MODERATOR, // Role pro marketéra
    },
  });
  console.log(`Moderator user created: ${marketer.name}`);

  // 3. Vytvoření kategorií
  for (const category of blogCategories) {
    await prisma.category.create({ data: category });
  }
  console.log("Categories created.");

  // 4. Vytvoření všech unikátních tagů
  const allTags = new Set(blogPosts.flatMap((post) => post.tags));
  for (const tagName of allTags) {
    await prisma.tag.create({
      data: {
        name: tagName,
        slug: createSlug(tagName),
      },
    });
  }
  console.log("All unique tags created.");

  // 5. Vytvoření článků a jejich propojení s tagy
  for (const postData of blogPosts) {
    const category = await prisma.category.findUnique({
      where: { slug: postData.category },
    });

    // Přiřazení článků různým autorům
    const authorId =
      postData.author === "Copywriter" ? editor.id : superAdmin.id;

    await prisma.post.create({
      data: {
        slug: postData.slug,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        published: true,
        authorId: authorId,
        categoryId: category?.id,
        createdAt: new Date(postData.date),
        tags: {
          connect: postData.tags.map((tagName) => ({
            slug: createSlug(tagName),
          })),
        },
      },
    });
    console.log(`Created post: ${postData.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
