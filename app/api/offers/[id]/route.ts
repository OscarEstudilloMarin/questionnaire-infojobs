import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: { id: string }
    }
) {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data: userData } = await supabase.auth.getUser()

    const body = await request.json()

    const formattedFormMark = Number(body.mark.split('.')[0])

    const { data, error } = await supabase.from('application').insert([
        {
            offer_id: Number(params.id),
            candidate_id: userData.user?.id,
            form_mark: formattedFormMark,
            answers: body.answers,
        },
    ])

    if (error) {
        console.log('ERROR', error)
    }

    return NextResponse.json(data)
}
