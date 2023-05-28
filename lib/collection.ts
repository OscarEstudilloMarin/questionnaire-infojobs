// SUPABASE
import type { Database } from './database.types'

export type SupabaseOffer = Database['public']['Tables']['offer']['Row']
export type User = Database['public']['Tables']['user']['Row']

export type SupabaseOfferWithUser = SupabaseOffer & {
    user: User
}
