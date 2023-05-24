import { useSupabase } from '@/app/supabase-provider'
import useUserStore from '@/store/useUserStore'

const useUser = () => {
    const { supabase } = useSupabase()

    const user = useUserStore((state) => state.user)

    const login = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (data) {
            useUserStore.setState({ user: data.user as any })
        }

        return { data, error }
    }

    const signUp = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        return { data, error }

        if (data) {
            useUserStore.setState({ user: data.user as any })
        }
    }

    return { login, signUp, user }
}

export default useUser
