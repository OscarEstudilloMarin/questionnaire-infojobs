import { SupabaseOffer } from '@/lib/collection'

export const getOffers = async (): Promise<SupabaseOffer[]> => {
    return await fetch('api/offers').then((res) => res.json())
}
