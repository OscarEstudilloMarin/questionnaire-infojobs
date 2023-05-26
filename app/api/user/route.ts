import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies })

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    // if (error) {
    //     return NextResponse.json(error, { status: 401 })
    // }

    return NextResponse.json(user)
}
