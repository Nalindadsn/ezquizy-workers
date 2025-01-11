import type {  Organization } from '@prisma/client'
import { db } from "@/lib/db";
import { notFound } from 'next/navigation'

export async function getData(id:string): Promise<Organization[]> {
    try {
        
    return await db.organization.findMany({
        include:{
            pool:true
        },
        where:{userId:id}
    })
    } catch (error) {
        return [];
    }
}

export async function fetchDataById(id: string): Promise<Organization | null> {
    const organization = await db.organization.findFirst({
        where: {
            id
        }
    })

    if (!organization) {
        notFound()
    }

    return organization
}