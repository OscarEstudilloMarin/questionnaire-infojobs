import OfferCard from '@/components/offer-card'
import { SupabaseOfferWithUser } from '@/lib/collection'

export interface BaseOffersGridProps {
    offers: SupabaseOfferWithUser[] | undefined
}

const BaseOffersGrid = ({ offers }: BaseOffersGridProps) => {
    return (
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
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

export default BaseOffersGrid
