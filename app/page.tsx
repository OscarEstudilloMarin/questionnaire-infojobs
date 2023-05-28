import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

import CreateOfferBtn from './create-offer-btn'
import OffersGrid from '@/components/offers-grid'

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data } = await supabase.auth.getUser()

    const { data: user } = await supabase
        .from('user')
        .select('*')
        .eq('id', data.user?.id)
        .single()

    return (
        <main className="flex w-full flex-col gap-4 overflow-y-auto p-10">
            {user?.type === 'employer' && <CreateOfferBtn />}

            <OffersGrid />
        </main>
    )
}
