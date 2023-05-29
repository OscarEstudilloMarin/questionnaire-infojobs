import useSWR from 'swr'
import { SupabaseOfferWithUser } from '@/lib/collection'
import { getOffers } from '@/service/offers-service'

const useOffers = ({ creatorId }: { creatorId?: string } = {}) => {
    const { data: offers } = useSWR<SupabaseOfferWithUser[]>('offers', () =>
        getOffers({ creatorId })
    )
    return { offers }
}

export default useOffers
