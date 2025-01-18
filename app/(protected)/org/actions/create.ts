"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { QuizCreateSchema } from "@/schemas";

import { revalidatePath } from "next/cache";

export const create = async (
  values: z.infer<typeof QuizCreateSchema>,
  id: any
) => {
  console.log(values);
  console.log(id);

  const name = values.name as string;
  const description = values.description as string;

  if (!name.trim()) {
    return;
  }
  // const  data= await db.organization.count( {where: { name: true }} )
  await db.organization.create({
    data: {
      name: name,
      description: description,
      country: country,
      examination: examination,
      grade: grade,
      year: year,
      medium: medium,
      slug: slug,
      section: section,
      type: type,
      category: category,
      keywords: keywords,

      userId: "6717bf00391027592347633a",
    },
  });

  // return { error: "www" }
  //   const user = await currentUser();

  //   if (!user) {
  //     return { error: "Unauthorized" }
  //   }
  // console.log("---------------------")
  // console.log(values)
  //   const updatedUser = await db.al.update({
  //     where: { id: id },
  //     data: {
  //       ...values,
  //     }
  //   });

  revalidatePath("/dashboard");

  return { success: "Record Created!" };
};
