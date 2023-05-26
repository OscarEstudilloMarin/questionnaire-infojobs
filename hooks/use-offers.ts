import useSWR from 'swr'
import { SupabaseOfferWithUser } from '@/lib/collection'
import { getOffers } from '@/service/offers-service'

const useOffers = () => {
    const { data: offers } = useSWR<SupabaseOfferWithUser[]>(
        'offers',
        getOffers
    )
    return { offers }
}

export default useOffers
