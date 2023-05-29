import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import type { SupabaseOfferWithUser } from '@/lib/collection'

import { Card } from '@/components/ui/card'
import ApplicationForm from '@/components/application-form'
import OfferPreview from '@/components/offers/display/OfferPreview/OfferPreview'

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

    const { data: offer } = (await supabase
        .from('offer')
        .select(`*, user (*)`)
        .match({ id })
        .single()) as { data: SupabaseOfferWithUser }

    return (
        <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1 p-5">
                <OfferPreview offer={offer} />
            </div>
            <div className="flex-1 p-5">
                <Application offer={offer} />
            </div>
        </div>
    )
}
