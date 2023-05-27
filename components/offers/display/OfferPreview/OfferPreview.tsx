import { useContext } from 'react'
import OfferHeader from '../OfferHeader/OfferHeader'
import {
    OfferFormContext,
    OfferFormContextType,
} from '../../contexts/offer-form'
import Image from 'next/image'

const OfferPreview = (): JSX.Element => {
    const {
        state: { image },
    } = useContext(OfferFormContext) as OfferFormContextType

    return (
        <div className="radius-lg flex flex-col bg-white">
            <div className="my-8 flex flex-row items-center justify-center gap-4">
                {image && (
                    <div className="flex flex-col">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="radius-sm aspect-square w-12"
                            src={image}
                            alt=""
                        />
                    </div>
                )}
                <div className="flex flex-col">
                    <OfferHeader />
                </div>
            </div>
            <div className="flex flex-row">{/* OfferDescription */}</div>
            <div>
                <div className="flex flex-row">{/* OfferAttributes */}</div>
            </div>
        </div>
    )
}

export default OfferPreview
