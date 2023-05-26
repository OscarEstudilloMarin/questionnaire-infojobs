'use client'

import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { SupabaseOfferWithUser } from '@/lib/collection'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

type OfferCardProps = {
    offer?: SupabaseOfferWithUser
    skeleton?: boolean
}

const OfferCard = ({ offer, skeleton }: OfferCardProps) => {
    const router = useRouter()

    return skeleton ? (
        <Card className="flex w-full cursor-pointer items-center gap-5 bg-white p-5 transition-colors hover:bg-accent">
            <div className="h-fit w-1/4 rounded-md border-[1px] border-solid border-border bg-white">
                <Skeleton className="h-28 w-full rounded-md" />
            </div>
            <div className="flex h-full w-3/4 flex-col items-start justify-between py-2">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-60" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Separator orientation="vertical" />
                    <Skeleton className="h-3 w-28" />
                    <Separator orientation="vertical" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </Card>
    ) : offer ? (
        <Card
            className="flex h-fit w-full cursor-pointer items-center gap-5 bg-white p-5 transition-colors hover:bg-accent"
            onClick={() => router.push(`/offers/${offer.id}`)}
        >
            <div className="h-fit w-1/4 rounded-md border-[1px] border-solid border-border bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={
                        'https://components.infojobs.com/statics/images/pic-company-logo.png'
                    }
                    alt={'icon'}
                    className="h-full w-full rounded-md object-cover"
                />
            </div>
            <div className="flex h-full w-3/4 flex-col items-start justify-between py-2">
                <div className="space-y-1">
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription className="uppercase text-primary">
                        {offer.user.name}
                    </CardDescription>
                </div>

                <div className="flex flex-col space-y-2">
                    <div className="flex h-4 items-center gap-2">
                        {offer.city && (
                            <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {offer.city}
                            </span>
                        )}
                        <Separator orientation="vertical" />
                        {offer.workType && (
                            <span className="text-xs text-gray-400">
                                {offer.workType}
                            </span>
                        )}
                        <Separator orientation="vertical" />
                        {offer.created_at && (
                            <span className="text-xs text-[#00a550]">
                                {dayjs(offer.created_at).fromNow()}
                            </span>
                        )}
                    </div>

                    <div className="flex h-4 items-center gap-2">
                        {offer.contractType && (
                            <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {`Contrato ${offer.contractType}`}
                            </span>
                        )}
                        <Separator orientation="vertical" />
                        {offer.salary && (
                            <span className="text-xs text-gray-400">
                                {`${offer.salary} €`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    ) : null
}

export default OfferCard
