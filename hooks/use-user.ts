import {
    getUser,
    logout as logoutService,
    login as loginService,
} from '@/service/user-service'
import useSWR from 'swr'
import * as z from 'zod'
import { userAuthSchema } from '@/lib/validations/auth'
import { useToast } from './use-toast'
import { User } from '@supabase/supabase-js'

type FormData = z.infer<typeof userAuthSchema>

const useUser = () => {
    const { toast } = useToast()
    const { data: user, mutate: setUser } = useSWR('user', getUser)

    const logout = async () => {
        await setUser(logoutService)
    }

    const login = async ({ email, password }: FormData) => {
        const { user, error } = await loginService({ email, password })

        if (user) await setUser(user)

        if (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            })
            throw error
        }
    }

    return { user, logout, login }
}

export default useUser
