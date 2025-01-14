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

export const settings = async (
  values: z.infer<typeof UserPoolSchema>,
  id:string
) => {
console.log(values)

const user:any = await currentUser();
  if (!user) {
    return { error: "Unauthorized" }
  }
const userId = id as string;
const note = values.note as string;
const poolId = values.poolId as string;

if (!userId.trim()) {
  return;
}
if (!poolId.trim()) {
  return;
}
const userExist=await db.userPool.count({
  where:{
    userId:userId,
    poolId:poolId
  }
})
if (userExist>0) {
  
  return { error: "Already Pined!" }
}else{
  await db.userPool.create({
    data: {
      userId: userId,
      note: note,
      poolId: poolId,
    },
  });
  
  revalidatePath(`/org/users`)
  redirect(`/org/pool/users`)

}





}