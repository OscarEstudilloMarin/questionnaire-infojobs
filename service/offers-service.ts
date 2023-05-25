import { Offer } from '@/lib/collection'

export const getOffers = async (): Promise<Offer[]> => {
    return await fetch('api/offers').then((res) => res.json())
}
