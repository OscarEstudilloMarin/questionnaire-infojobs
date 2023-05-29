import { SupabaseOfferWithUser } from '@/lib/collection'

import type { FormValues } from '@/components/create-offer-form'

export const getOffers = async (): Promise<SupabaseOfferWithUser[]> => {
    return await fetch('/api/offers').then((res) => res.json())
}

interface PublishOfferBody {
    offer: FormValues
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

export const applyOffer = async (
    offerId: number,
    questions: string[],
    answers: string[]
): Promise<void> => {
    const response = await fetch('/api/validate', {
        method: 'POST',
        body: JSON.stringify({
            questions,
            answers,
        }),
    })

    const formattedResponse = await response.json()

    return await fetch(`/api/offers/${offerId}`, {
        method: 'POST',
        body: JSON.stringify({ mark: formattedResponse.data, answers }),
    }).then((res) => res.json())
}
