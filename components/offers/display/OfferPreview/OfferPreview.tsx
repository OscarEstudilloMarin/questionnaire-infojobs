import { useContext } from 'react'
import OfferHeader from '../OfferHeader/OfferHeader'
import {
    OfferFormContext,
    OfferFormContextType,
} from '../../contexts/offer-form'
import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'

const OfferPreview = (): JSX.Element => {
    const {
        state: { bannerImage, city, workType, salary, contractType, category },
    } = useContext(OfferFormContext) as OfferFormContextType

    return (
        <div className="radius-lg flex flex-col bg-white pb-8">
            <div className="flex h-40 w-full bg-slate-300">
                {bannerImage && (
                    <Image
                        alt="banner-image"
                        className="object-cover"
                        src={bannerImage}
                    />
                )}
            </div>
            <div className="my-8 flex flex-row items-center justify-center gap-4">
                <div className="flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="radius-lg aspect-square w-16"
                        src={
                            'https://components.infojobs.com/statics/images/pic-company-logo.png'
                        }
                        alt=""
                    />
                </div>

                <div className="flex flex-col">
                    <OfferHeader />
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-1 px-4">
                    {city && (
                        <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                            {city}
                        </span>
                    )}
                    <Separator orientation="vertical" />
                    {category && (
                        <span className="text-xs text-gray-400">
                            {category}
                        </span>
                    )}
                    <Separator orientation="vertical" />
                    {workType && (
                        <span className="text-xs text-gray-400">
                            {workType}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1 px-4">
                    {contractType && (
                        <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                            {contractType}
                        </span>
                    )}
                    <Separator orientation="vertical" />
                    {salary && (
                        <span className="text-xs text-gray-400">
                            {salary} €
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OfferPreview
