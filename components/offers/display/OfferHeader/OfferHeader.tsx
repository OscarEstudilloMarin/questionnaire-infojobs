'use client'

import { SupabaseOfferWithUser } from '@/lib/collection'

interface OfferHeaderProps {
    title: SupabaseOfferWithUser['title']
    employer: SupabaseOfferWithUser['user']['name']
}

const OfferHeader = ({ title, employer }: OfferHeaderProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-0.5">
            <p className="text-center text-lg font-bold sm:text-left">
                {title}
            </p>
            <p className="text-center text-sm font-normal text-primary sm:text-left">
                {employer}
            </p>
        </div>
    )
}

export default OfferHeader
