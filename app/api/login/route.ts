import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request, response: Response) {
    const supabase = createRouteHandlerClient({ cookies })

    const { email, password } = await request.json()

    const { data: user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        return NextResponse.json(
            { error: 'Credenciales incorrectas' },
            { status: 401 }
        )
    }

    return NextResponse.json({ user: user.user })
}
