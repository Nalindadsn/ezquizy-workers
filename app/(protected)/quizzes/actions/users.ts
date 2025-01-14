'use server'

// import { db } from "@/lib/db";
import { db } from "@/lib/db";
import type { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(4000),
})

interface UserFormState {
    errors: {
        name?: string[],
        email?: string[],
        _form?: string[],
    }
}

export async function createUser(
    formState: UserFormState,
    formData: FormData
): Promise<UserFormState> {
    const result = userSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let user: User
    try {
        user = await db.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                // userId:"te"
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function updateUser(
    id: string,
    formState: UserFormState,
    formData: FormData
): Promise<UserFormState> {
    const result = userSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let user: User
    try {
        user = await db.user.update({
            where: { id },
            data: {
                name: result.data.name,
                email: result.data.email,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function deleteUser(
    id: string,
): Promise<UserFormState> {
    let user: User
    try {
        user = await db.user.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}