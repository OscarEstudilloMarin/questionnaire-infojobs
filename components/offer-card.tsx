import { Offer } from '@/lib/collection'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type OfferCardProps = {
    offer: Offer
}

const OfferCard = ({ offer }: OfferCardProps) => {
    return (
        <Card className="flex w-full cursor-pointer items-center bg-secondary/75 p-5 transition-colors hover:bg-secondary">
            <div className="h-fit w-1/4 rounded-md bg-white">
                {offer.author.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={offer.author.logoUrl}
                        alt={offer.author.name + ' icon'}
                        className="h-full w-full rounded-md object-cover"
                    />
                ) : null}
            </div>
            <CardHeader className="flex h-full w-3/4 flex-col items-start">
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.author.name}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default OfferCard
