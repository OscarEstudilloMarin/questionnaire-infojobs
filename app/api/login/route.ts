import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })

    console.log(req.body)
    //
    // const { email, password } = await req.body

    // console.log(email, password)

    // const { data: user, error } = await supabase.auth.signInWithPassword({
    //     email: email,
    //     password: password,
    // })

    // return NextResponse.json({ user: user.user, error })
}
