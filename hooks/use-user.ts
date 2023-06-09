import {
    getUser,
    logout as logoutService,
    login as loginService,
} from '@/service/user-service'
import useSWR from 'swr'
import * as z from 'zod'
import { userAuthSchema } from '@/lib/validations/auth'

import { Session } from '@supabase/supabase-js'

type FormData = z.infer<typeof userAuthSchema>

const useUser = (session: Session | null) => {
    const {
        data: user,
        mutate: setUser,
        isLoading,
    } = useSWR(session ? 'user' : null, getUser)

    const logout = async () => {
        await setUser(logoutService)
    }

    const login = async ({ email, password }: FormData) => {
        const { user, error } = await loginService({ email, password })

        if (error) throw error

        if (user) await setUser(user)
    }

    return { user, logout, login, isLoading }
}

export default useUser
