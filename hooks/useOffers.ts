'use client'

import useSWR from 'swr'
import { Offer } from '@/lib/collection'
import { getOffers } from '@/service/offersService'

const useOffers = () => {
    const { data: offers } = useSWR<Offer[]>('offers', getOffers)
    return { offers }
}

export default useOffers
