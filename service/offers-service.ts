import { OfferFormState } from '@/components/offers/input/OfferFormFields/offer-form-fields.types'
import { SupabaseOfferWithUser } from '@/lib/collection'

export const getOffers = async (): Promise<SupabaseOfferWithUser[]> => {
    return await fetch('api/offers').then((res) => res.json())
}

interface PublishOfferBody {
    offer: OfferFormState
}

export const createOffer = async (
    body: PublishOfferBody
): Promise<SupabaseOfferWithUser[]> => {
    console.log('body', body)

    return await fetch('/api/offers', {
        method: 'POST',
        body: JSON.stringify(body),
    }).then((res) => res.json())
}
