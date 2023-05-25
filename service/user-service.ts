import { User } from '@supabase/supabase-js'
import * as z from 'zod'
import { userAuthSchema } from '@/lib/validations/auth'

type FormData = z.infer<typeof userAuthSchema>

export const getUser = async (): Promise<User> => {
    return await fetch('api/user').then((res) => res.json())
}

export const logout = async (): Promise<User> => {
    return await fetch('api/logout', {
        method: 'POST',
    }).then((res) => res.json())
}

export const login = async ({
    email,
    password,
}: FormData): Promise<{ user: User; error: Error }> => {
    return await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }).then((res) => res.json())
}
