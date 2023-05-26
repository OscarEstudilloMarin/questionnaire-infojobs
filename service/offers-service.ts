import { SupabaseOfferWithUser } from '@/lib/collection'

export const getOffers = async (): Promise<SupabaseOfferWithUser[]> => {
    return await fetch('api/offers').then((res) => res.json())
}
