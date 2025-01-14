"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { LanguagesSchema } from "@/schemas";

import { revalidatePath } from "next/cache";

export const settings = async (
  values: z.infer<typeof LanguagesSchema>,
  id: any
) => {
  // return { error: "www" }

  const updatedUser = await db.organization.update({
    where: { id: id },
    data: {
      ...values,
    },
  });
  console.log(updatedUser);

  revalidatePath("/dashboard");

  return { success: "Settings Updated!" };
};
