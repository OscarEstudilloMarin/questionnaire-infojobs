'use client'

import OfferHeader from '../OfferHeader/OfferHeader'
import { Separator } from '@radix-ui/react-separator'
import { SupabaseOfferWithUser } from '@/lib/collection'
import { Banknote, Briefcase, FileText, Laptop, MapPin } from 'lucide-react'

export interface OfferPreviewProps {
    offer: SupabaseOfferWithUser
}

const OfferPreview = ({
    offer: {
        title,
        banner_image,
        city,
        category,
        work_type,
        contract_type,
        salary,
        user: { name: employer, image: employer_image },
        description,
    },
}: OfferPreviewProps): JSX.Element => {
    return (
        <div className="flex flex-col rounded-lg bg-white pb-8">
            <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-lg bg-slate-300">
                {banner_image && (
                    <img
                        alt="banner-image"
                        className="object-cover"
                        src={banner_image}
                    />
                )}
            </div>
            <div className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="aspect-square w-16 rounded-lg object-cover"
                        src={
                            employer_image ||
                            'https://components.infojobs.com/statics/images/pic-company-logo.png'
                        }
                        alt=""
                    />
                </div>

                <div className="flex flex-col">
                    <OfferHeader title={title} employer={employer} />
                </div>
            </div>
            <div className="flex items-center justify-center p-5">
                <p>{description}</p>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col gap-1 px-4">
                    {city && (
                        <div className="flex flex-row gap-1">
                            <MapPin size={14} color="gray" />
                            <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {city}
                            </span>
                        </div>
                    )}
                    <Separator orientation="vertical" />
                    {category && (
                        <div className="flex flex-row gap-1">
                            <Laptop size={14} color="gray" />
                            <span className="text-xs text-gray-400">
                                {category}
                            </span>
                        </div>
                    )}
                    <Separator orientation="vertical" />
                    {work_type && (
                        <div className="flex flex-row gap-1">
                            <Briefcase size={14} color="gray" />
                            <span className="text-xs text-gray-400">
                                {work_type}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1 px-4">
                    {contract_type && (
                        <div className="flex flex-row gap-1">
                            <FileText size={14} color="gray" />
                            <span className="max-w-[125px] truncate whitespace-nowrap text-xs text-gray-400">
                                {contract_type}
                            </span>
                        </div>
                    )}
                    <Separator orientation="vertical" />
                    {salary && (
                        <div className="flex flex-row gap-1">
                            <Banknote size={14} color="gray" />
                            <span className="text-xs text-gray-400">
                                {salary} €
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OfferPreview
