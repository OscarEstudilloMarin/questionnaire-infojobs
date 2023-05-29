'use client'

import { OfferFormState } from '@/components/offers/input/OfferFormFields/offer-form-fields.types'
import { createContext } from 'react'

export const OfferFormContext = createContext<OfferFormContextType | null>(null)

export type OfferFormContextType = {
    state: OfferFormState
    setState: React.Dispatch<React.SetStateAction<OfferFormState>>
}

export const OfferFormProvider = OfferFormContext.Provider
