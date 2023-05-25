'use client'

import LabeledInput from '@/components/common/input/LabeledInput/LabeledInput'
import { useContext, useState } from 'react'

import {
    OfferFormContext,
    OfferFormContextType,
} from '../../contexts/offer-form'

const OfferFormFields = (): JSX.Element => {
    const { state, setState } = useContext(
        OfferFormContext
    ) as OfferFormContextType

    return (
        <div className="flex flex-col gap-6">
            {Object.entries(state).map(
                (item, index) =>
                    typeof item[1] !== 'boolean' && (
                        <LabeledInput
                            key={index}
                            label={item[0]}
                            value={item[1]}
                            onChange={(e) =>
                                setState((prev) => ({
                                    ...prev,
                                    [item[0]]: e.target.value,
                                }))
                            }
                            parse
                        />
                    )
            )}
        </div>
    )
}

export default OfferFormFields
