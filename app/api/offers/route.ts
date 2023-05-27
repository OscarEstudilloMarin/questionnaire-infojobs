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

export async function POST(req: any) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { userId, offer } = req.body

    const { data } = await supabase.from('offer').insert([
        {
            title: offer.title,
            province: offer.province,
            city: offer.city,
            link: offer.link,
            category: offer.category,
            contractType: offer.contractType,
            subcategory: offer.subcategory,
            salaryMin: offer.salaryMin,
            salaryMax: offer.salaryMax,
            salaryPeriod: offer.salaryPeriod,
            experienceMin: offer.experienceMin,
            workDay: offer.workDay,
            study: offer.study,
            teleworking: offer.teleworking,
            published: offer.published,
            updated: offer.updated,
        },
    ])

    return NextResponse.json(data)
}
