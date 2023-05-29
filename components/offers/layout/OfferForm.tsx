'use client'

import { OfferFormProvider } from '../contexts/offer-form'
import { initialOfferFormState } from '../input/OfferFormFields/offer-form-fields.types'
import { Button } from '@/components/ui/button'
import OfferFormFields from '@/components/offers/input/OfferFormFields/offer-form-fields'
import OfferPreview from '@/components/offers/display/OfferPreview/OfferPreview'
import { useState } from 'react'
import { OfferFormState } from '@/components/offers/input/OfferFormFields/offer-form-fields.types'
import { createOffer } from '@/service/offers-service'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/icons'
import { useToast } from '@/hooks/use-toast'
import Questionnaire from '@/components/questionnaire'

const OfferForm = (): JSX.Element => {
    const [formState, setFormState] = useState<OfferFormState>(
        initialOfferFormState
    )

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { toast } = useToast()

    const navigateToMain = () => {
        setLoading(false)
        router.push('/')
    }

    const publishOffer = async () => {
        setLoading(true)
        // await createOffer({ offer: formState })
        navigateToMain()
        toast({
            title: 'Oferta creada con éxito!',
            description: 'Puedes ver la nueva oferta en la página principal.',
            variant: 'default',
        })
    }

    const offerForm = { state: formState, setState: setFormState }

    return (
        <OfferFormProvider value={offerForm}>
            <form onSubmit={publishOffer}>
                <div className="flex flex-1 flex-col">
                    <section className="flex flex-row items-center justify-between py-12">
                        <p className="font flex flex-1 text-2xl font-bold">
                            Crear oferta
                        </p>
                        <div className="gap flex flex-row items-center gap-x-4">
                            <Button variant="default" type="submit">
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Publicar
                            </Button>
                        </div>
                    </section>
                    <section className="flex justify-between gap-12">
                        <div className="flex w-1/2 flex-col">
                            <OfferFormFields />
                        </div>
                        <div className="flex w-1/2 flex-col pt-8">
                            <OfferPreview />
                        </div>
                    </section>
                </div>
            </form>
        </OfferFormProvider>
    )
}

export default OfferForm
