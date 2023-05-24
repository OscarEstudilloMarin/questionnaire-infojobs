import { create } from 'zustand'
import type { User } from '../lib/collection'

interface state {
    user: User | null
}

const useUserStore = create<state>((set) => ({
    user: {
        email: '',
    },
}))

export default useUserStore
