import { SupabaseApplicationWithUser } from '@/lib/collection'

export const getApplicationsByOffer = async ({
    offerId,
}: {
    offerId: number | undefined
}): Promise<SupabaseApplicationWithUser[]> => {
    if (!offerId) {
        throw new Error('Offer id is not defined')
    }
    return await fetch(`/api/offers/${offerId}/applications`).then((res) =>
        res.json()
    )
}
