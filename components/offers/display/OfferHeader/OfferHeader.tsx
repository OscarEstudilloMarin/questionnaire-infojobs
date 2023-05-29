'use client'

import { SupabaseOfferWithUser } from '@/lib/collection'

interface OfferHeaderProps {
    title: SupabaseOfferWithUser['title']
    employer: SupabaseOfferWithUser['user']['name']
}

const OfferHeader = ({ title, employer }: OfferHeaderProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-0.5">
            <p className="text-lg font-bold">{title}</p>
            <p className="text-sm font-normal">{employer}</p>
        </div>
    )
}

export default OfferHeader
