'use client'

import useOffers from '@/hooks/use-offers'
import BaseOffersGrid from './base-offers-grid'

export default function OffersGrid({ creatorId }: { creatorId?: string } = {}) {
    const { offers } = useOffers({ creatorId: creatorId || undefined })

    return <BaseOffersGrid offers={offers} />
}
