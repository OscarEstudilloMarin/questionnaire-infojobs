import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export async function GET() {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase.from('offer').select(`*, user (*)`)

    return NextResponse.json(data)
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
