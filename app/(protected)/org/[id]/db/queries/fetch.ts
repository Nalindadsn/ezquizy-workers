import type { LanguageProficiency, Organization, User } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export async function fetchLanguages(id: any): Promise<LanguageProficiency[]> {
  return await db.languageProficiency.findMany({
    where: {
      userId: id.id,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchById(id: string): Promise<Organization | null> {
  const organization = await db.organization.findFirst({
    where: {
      id,
    },
  });
  console.log("organization1");
  console.log(organization);
  console.log("organization2");
  if (!organization) {
    notFound();
  }

  return organization;
}
