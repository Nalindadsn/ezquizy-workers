import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(  request: Request,
  { params }: { params: { id: string } }) {

   const user = await db.user.findFirst({
    where: {
        id:params?.id as string
    },
    include:{
        address:{
          orderBy:{
            id:"asc"
          }
        },
        contactNumbers:{
          orderBy:{
            id:"asc"
          }
        },
        socialLinks:{
          orderBy:{
            id:"asc"
          }
        },
        course:{
          orderBy:{
            id:"asc"
          }
        },
        languageProficiency:{
          orderBy:{
            id:"asc"
          }
        },
        workingExperience:{
          orderBy:{
            id:"asc"
          }
        }
    }
    
})

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
