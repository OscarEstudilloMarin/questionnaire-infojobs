'use client'

import useAppliedOffers from '@/hooks/use-applied-offers'
import BaseOffersGrid from './base-offers-grid'

const AppliedOffersGrid = () => {
    const { data: offers } = useAppliedOffers()

    return <BaseOffersGrid offers={offers} />
}

export default AppliedOffersGrid
