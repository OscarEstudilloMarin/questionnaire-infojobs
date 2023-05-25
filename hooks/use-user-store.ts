import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'

interface State {
    user: User | null
    setUser: (user: User) => void
}

const useUserStore = create<State>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
}))

export default useUserStore
