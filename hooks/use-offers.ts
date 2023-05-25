import useSWR from 'swr'
import { Offer } from '@/lib/collection'
import { getOffers } from '@/service/offers-service'

const useOffers = () => {
    const { data: offers } = useSWR<Offer[]>('offers', getOffers)
    return { offers }
}

export default useOffers
