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
    const { data } = await supabase.from('offer').select(`*, user (*)`)

    return NextResponse.json(data)
}

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data: userData } = await supabase.auth.getUser()

    const body = await req.json()

    console.log('body', body)

    const offer = body.offer

    const { data } = await supabase.from('offer').insert([
        {
            title: offer.title,
            description: offer.description,
            category: offer.category,
            city: offer.city,
            contractType: offer.contractType,
            workType: offer.workType,
            salary: offer.salary,
            bannerImage: offer.bannerImage,
            creator_id: userData.user?.id,
        },
    ])

    return NextResponse.json(data)
}
