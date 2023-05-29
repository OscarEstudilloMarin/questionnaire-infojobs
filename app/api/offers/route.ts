import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    console.log(req.query)

    if (req.query?.creatorId) {
        const { data: offers } = await supabase
            .from('offer')
            .select(`*, user (*)`)
            .match({ creator_id: req.query.creatorId })
        return NextResponse.json(offers)
    } else {
        const { data: offers } = await supabase
            .from('offer')
            .select(`*, user (*)`)
        return NextResponse.json(offers)
    }
}

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data: userData } = await supabase.auth.getUser()

    const body = await req.json()

    const offer = body.offer

    const { data } = await supabase.from('offer').insert([
        {
            title: offer.title,
            description: offer.description,
            category: offer.category,
            city: offer.city,
            contract_type: offer.contract_type,
            work_type: offer.work_type,
            salary: offer.salary,
            banner_image: offer.banner_image,
            creator_id: userData.user?.id,
            questions: offer.questions,
        },
    ])

    return NextResponse.json(data)
}
