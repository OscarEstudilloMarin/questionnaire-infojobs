'use client'

import OfferCard from '@/components/offer-card'
import useOffers from '@/hooks/use-offers'

export default function Home() {
    const { offers } = useOffers()

    return (
        <main
            className="overflow-y-auto p-10"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gridGap: '1rem',
            }}
        >
            {offers && offers.length > 0
                ? offers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} />
                  ))
                : null}
        </main>
    )
}
