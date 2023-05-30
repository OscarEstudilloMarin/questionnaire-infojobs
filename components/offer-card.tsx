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
            <div className="aspect-square h-fit w-1/4 rounded-md border-[1px] border-solid border-border bg-white">
                <Skeleton className="h-full w-full rounded-md" />
            </div>
            <div className="flex h-full w-3/4 flex-col items-start justify-between gap-2 py-2">
                <div className="flex w-full flex-col gap-2">
                    <Skeleton className="h-5 w-[80%]" />
                    <Skeleton className="h-3 w-[70%]" />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center gap-2">
                        <Skeleton className="h-3 w-[20%]" />
                        <Separator orientation="vertical" />
                        <Skeleton className="h-3 w-[22%]" />
                        <Separator orientation="vertical" />
                        <Skeleton className="h-3 w-[25%]" />
                    </div>
                    <div className="flex w-full items-center  gap-2">
                        <Skeleton className="h-3 w-[30%]" />
                        <Separator orientation="vertical" />
                        <Skeleton className="h-3 w-[20%]" />
                    </div>
                </div>
            </div>
        </Card>
    ) : offer ? (
        <Card
            className="flex h-fit w-full cursor-pointer items-center gap-5 bg-white p-5 transition-colors hover:bg-accent"
            onClick={() => router.push(`/offers/${offer.id}`)}
        >
            <div
                className={`flex aspect-square w-1/4 items-center justify-center rounded-md ${
                    !offer?.user.image
                        ? ' border-[1px] border-solid border-border'
                        : ''
                } bg-white`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={
                        offer?.user.image ||
                        'https://components.infojobs.com/statics/images/pic-company-logo.png'
                    }
                    alt={'icon'}
                    className="h-full rounded-md object-cover"
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
                        {offer.work_type && (
                            <span className="text-xs text-gray-400">
                                {offer.work_type}
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
                        {offer.contract_type && (
                            <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {`Contrato ${offer.contract_type}`}
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
