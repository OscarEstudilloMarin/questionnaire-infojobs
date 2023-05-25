'use client'

import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'

export default async function UseUser() {
    const supabase = createClientComponentClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}
