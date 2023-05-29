'use client'

import OfferCard from '@/components/offer-card'
import useOffers from '@/hooks/use-offers'

export default function OffersGrid({ creatorId }: { creatorId?: string } = {}) {
    const { offers } = useOffers({ creatorId: creatorId || undefined })

    return (
        <div className="gap-4 sm:grid sm:grid-cols-2">
            {offers
                ? offers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} />
                  ))
                : Array.from({ length: 20 }).map((_, i) => (
                      <OfferCard key={i} skeleton />
                  ))}
        </div>
    )
}
