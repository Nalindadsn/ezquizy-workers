import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const org:any =  await db.organization.findMany()
  return new NextResponse(JSON.stringify(org), { status: 200 });
}
