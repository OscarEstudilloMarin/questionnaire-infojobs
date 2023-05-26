import {
    getUser,
    logout as logoutService,
    login as loginService,
} from '@/service/user-service'
import useSWR from 'swr'
import * as z from 'zod'
import { userAuthSchema } from '@/lib/validations/auth'

type FormData = z.infer<typeof userAuthSchema>

const useUser = () => {
    const { data: user, mutate: setUser } = useSWR('user', getUser)

    const logout = async () => {
        await setUser(logoutService)
    }

    const login = async ({ email, password }: FormData) => {
        const { user, error } = await loginService({ email, password })

        if (error) throw error

        if (user) await setUser(user)
    }

    return { user, logout, login }
}

export default useUser
