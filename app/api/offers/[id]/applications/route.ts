import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { SupabaseApplicationWithUser } from '@/lib/collection'

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string }
    }
) {
    const { id } = params

    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data: applications } = (await supabase
        .from('application')
        .select(`*, user (*)`)
        .match({ offer_id: id })) as { data: SupabaseApplicationWithUser[] }

    const applicationsSorted = applications.sort((a, b) => {
        if (!a.form_mark || !b.form_mark) {
            return 0
        }
        if (a.form_mark < b.form_mark) {
            return 1
        }
        if (a.form_mark > b.form_mark) {
            return -1
        }
        return 0
    })

    return NextResponse.json(applicationsSorted)
}
