import OfferForm from '@/components/offers/layout/OfferForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { redirect } from 'next/navigation'
import Questionnaire from '@/components/questionnaire'

export default async function CreateOfferPage(): Promise<JSX.Element> {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data } = await supabase.auth.getUser()

    const { data: user } = await supabase
        .from('user')
        .select('*')
        .eq('id', data.user?.id)
        .single()

    if (user?.type !== 'employer') {
        redirect('/')
    }

    return (
        <div className="flex flex-col space-y-5 px-5">
            <OfferForm />
            <Questionnaire />
        </div>
    )
}
