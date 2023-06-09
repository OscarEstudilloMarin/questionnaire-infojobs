// SUPABASE
import type { Database } from './database.types'

export type SupabaseOffer = Database['public']['Tables']['offer']['Row']
export type User = Database['public']['Tables']['user']['Row']

export type SupabaseOfferWithUser = SupabaseOffer & {
    user: User
}

export type SupabaseApplication =
    Database['public']['Tables']['application']['Row']

export type SupabaseApplicationWithUser = SupabaseApplication & {
    user: User
}
