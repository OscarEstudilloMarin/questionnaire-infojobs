import useSWR from 'swr'
import { SupabaseOfferWithUser } from '@/lib/collection'
import { appliedOffer } from '@/service/offers-service'
export default function useAppliedOffers() {
    const { data } = useSWR<SupabaseOfferWithUser[]>('offers', () =>
        appliedOffer()
    )
    return { data }
}
