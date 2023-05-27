'use client'

import { OfferFormProvider } from '../contexts/offer-form'
import { initialOfferFormState } from '../input/OfferFormFields/offer-form-fields.types'
import { Button } from '@/components/ui/button'
import OfferFormFields from '@/components/offers/input/OfferFormFields/offer-form-fields'
import OfferPreview from '@/components/offers/display/OfferPreview/OfferPreview'
import { useState } from 'react'
import { OfferFormState } from '@/components/offers/input/OfferFormFields/offer-form-fields.types'

const OfferForm = (): JSX.Element => {
    const [formState, setFormState] = useState<OfferFormState>(
        initialOfferFormState
    )

    const offerForm = { state: formState, setState: setFormState }

    return (
        <OfferFormProvider value={offerForm}>
            <form>
                <div className="flex flex-1 flex-col">
                    <section className="flex flex-row items-center justify-between py-12">
                        <h2 className="font flex flex-1 text-2xl font-bold">
                            Create offer page
                        </h2>
                        <div className="gap flex flex-row items-center gap-x-4">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="default">Publish</Button>
                        </div>
                    </section>
                    <section className="flex flex-1 flex-row gap-12">
                        <div className="flex flex-1 flex-col">
                            <OfferFormFields />
                        </div>
                        <div className="flex flex-1 flex-col justify-center rounded-lg">
                            <OfferPreview />
                        </div>
                    </section>
                </div>
            </form>
        </OfferFormProvider>
    )
}

export default OfferForm
