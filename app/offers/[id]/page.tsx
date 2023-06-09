import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import type { SupabaseOfferWithUser } from '@/lib/collection'
import { redirect } from 'next/navigation'

import { Card } from '@/components/ui/card'
import ApplicationForm from '@/components/application-form'
import OfferPreview from '@/components/offers/display/OfferPreview/OfferPreview'
import QuestionnaireSummary from '@/components/offers/display/questionnaire-summary'
import ApplicationsTable from '@/components/application-table/applicaitons'
import BackButton from '@/components/back-button'

const Application = ({ offer }: { offer: SupabaseOfferWithUser }) => {
    return (
        <Card className="space-y-5 p-5">
            <span className="text-md font-semibold">Inscripción:</span>
            <ApplicationForm offer={offer} />
        </Card>
    )
}

export default async function OfferPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data } = await supabase.auth.getUser()

    const { data: user } = await supabase
        .from('user')
        .select('*')
        .eq('id', data.user?.id)
        .single()

    const { data: offer } = (await supabase
        .from('offer')
        .select(`*, user (*)`)
        .match({ id })
        .single()) as { data: SupabaseOfferWithUser }

    const { data: application } = await supabase
        .from('application')
        .select('*')
        .eq('offer_id', id)
        .eq('candidate_id', user?.id)
        .single()

    if (user?.type === 'employer' && offer.creator_id !== user.id) {
        redirect('/')
    }

    return (
        <div>
            <BackButton />
            <div className="flex flex-col">
                <div className="flex-1 space-y-5 p-5">
                    <OfferPreview offer={offer} />
                    {user?.type === 'employer' && (
                        <QuestionnaireSummary offer={offer} />
                    )}
                </div>
                <div className="flex-1 p-5">
                    {application ? (
                        <div className="flex justify-center">
                            <p>¡Ya has aplicado a esta oferta!</p>
                        </div>
                    ) : user?.type === 'candidate' ? (
                        <Application offer={offer} />
                    ) : user?.type === 'employer' ? (
                        // <ApplicationsList offerId={offer.id} />
                        <ApplicationsTable offerId={offer.id} />
                    ) : null}
                </div>
            </div>
        </div>
    )
}
