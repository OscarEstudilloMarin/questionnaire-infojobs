import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data: user } = await supabase.auth.getUser()

    if (!user?.user?.id) return NextResponse.error()
    const { data: applicationWithOffer } = await supabase
        .from('application')
        .select(`candidate_id, offer (*, user(*))`)
        .match({ candidate_id: user.user.id })

    const offers = applicationWithOffer?.map(({ offer }) => ({ ...offer }))

    return NextResponse.json(offers)
}
