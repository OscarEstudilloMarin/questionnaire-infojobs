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
    console.log('body', body)

    return NextResponse.json({})
}
