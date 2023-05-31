import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

import CreateOfferBtn from './create-offer-btn'
import OffersGrid from '@/components/offers-grid'
import { Info } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

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
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="secondary" className="w-fit">
                        Cómo probar
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                    Place content for the popover here.
                </PopoverContent>
            </Popover>

            <div className="mb-4 flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Ofertas</h1>
                {user?.type === 'employer' && <CreateOfferBtn />}
            </div>
            <OffersGrid
                creatorId={user?.type === 'employer' ? user?.id : undefined}
            />
        </main>
    )
}
