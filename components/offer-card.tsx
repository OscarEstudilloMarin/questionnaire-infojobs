import { Offer } from '@/lib/collection'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'

type OfferCardProps = {
    offer?: Offer
    skeleton?: boolean
}

const OfferCard = ({ offer, skeleton }: OfferCardProps) => {
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
        <Link href={`/offers/${offer.id}`}>
            <Card className="flex w-full cursor-pointer items-center gap-5 bg-white p-5 transition-colors hover:bg-accent">
                <div className="h-fit w-1/4 rounded-md border-[1px] border-solid border-border bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={
                            offer.author.logoUrl ||
                            'https://components.infojobs.com/statics/images/pic-company-logo.png'
                        }
                        alt={offer.author.name + ' icon'}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className="flex h-full w-3/4 flex-col items-start justify-between py-2">
                    <div>
                        <CardTitle>{offer.title}</CardTitle>
                        <CardDescription>{offer.author.name}</CardDescription>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        {offer.city && (
                            <span className="... max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {offer.city}
                            </span>
                        )}
                        <Separator orientation="vertical" />
                        {offer.teleworking && (
                            <span className="text-xs text-gray-400">
                                {offer.teleworking.value}
                            </span>
                        )}
                        {offer.salaryMin.value && offer.salaryMax.value ? (
                            <>
                                <Separator orientation="vertical" />
                                <span className="text-xs text-gray-400">
                                    {offer.salaryMin.value} -{' '}
                                    {offer.salaryMax.value}
                                </span>
                            </>
                        ) : null}
                    </div>
                </div>
            </Card>
        </Link>
    ) : null
}

export default OfferCard
