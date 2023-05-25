import { useContext } from 'react'
import {
    OfferFormContext,
    OfferFormContextType,
} from '../../contexts/offer-form'

const OfferHeader = (): JSX.Element => {
    const {
        state: { title, city, teleworking, contractType },
    } = useContext(OfferFormContext) as OfferFormContextType

    return (
        <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{title}</p>
            <p className="text-md font-normal">{city}</p>
            <p className="text-md font-normal">{contractType}</p>
            {teleworking && (
                <p className="text-md font-normal">Telework available</p>
            )}
        </div>
    )
}

export default OfferHeader
