import type { Organization } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export async function list(): Promise<Organization[]> {
  const data = await db.organization.findMany();

  return data;
}

export async function fetchLanguageById(
  id: string
): Promise<Organization | null> {
  const user = await db.organization.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}
