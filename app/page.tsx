'use client'

import OfferCard from '@/components/offer-card'
import useOffers from '@/hooks/use-offers'

import Questionnaire from '@/components/questionnaire'

export default function Home() {
    const { offers } = useOffers()

    return (
        <main className="flex w-full flex-col gap-4 overflow-y-auto p-10 sm:grid sm:grid-cols-2">
            {offers
                ? offers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} />
                  ))
                : Array.from({ length: 20 }).map((_, i) => (
                      <OfferCard key={i} skeleton />
                  ))}

            <Questionnaire />
        </main>
    )
}
