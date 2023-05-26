import useSWR from 'swr'
import { SupabaseOffer } from '@/lib/collection'
import { getOffers } from '@/service/offers-service'

const useOffers = () => {
    const { data: offers } = useSWR<SupabaseOffer[]>('offers', getOffers)
    return { offers }
}

export default useOffers
