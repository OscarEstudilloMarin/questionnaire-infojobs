import { useContext } from 'react'
import {
    OfferFormContext,
    OfferFormContextType,
} from '../../contexts/offer-form'

const OfferHeader = (): JSX.Element => {
    const {
        state: { title },
    } = useContext(OfferFormContext) as OfferFormContextType

    return (
        <div className="flex flex-col gap-0.5">
            <p className="text-lg font-bold">{title}</p>
            <p className="text-sm font-normal">Employer name</p>
        </div>
    )
}

export default OfferHeader
