import { OffersResponse } from '@/lib/collection'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export async function GET() {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    // const res = await fetch('https://api.infojobs.net/api/9/offer', {
    //     headers: {
    //         Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`,
    //     },
    // })

    // const data = (await res.json()) as OffersResponse

    // return NextResponse.json(data.offers)
    const { data, error } = await supabase.from('offer').select(`*, user (*)`)

    return NextResponse.json(data)
}
