"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { UserPoolSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const tagsUpdate = async (
  tags:any,userId:any,sectionId:string
) => {

  let tagsOneD = tags.map((item:any) => item.value);

  const count = await db.userTag.count({
    where: {
      userId: userId,
      quizzesSectionId: sectionId
    }
  })
  console.log(tagsOneD)

if (count>0) {
  const newUser = await db.userTag.updateMany({
    where: {userId: userId
    ,quizzesSectionId: sectionId
    },
    data: {
      tags:tagsOneD
    },
  })
}else{
  
  await db.userTag.create({
    data: {
      userId: userId,
      tags:tagsOneD,
      quizzesSectionId: sectionId
    },
  });
}
  // console.log(tags)

  revalidatePath(`/quizzes`)
  return { success: "succ" };
  // redirect(`/org/pool/users`)





}