import { OffersResponse } from '@/lib/collection'
import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch('https://api.infojobs.net/api/9/offer', {
        headers: {
            Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`,
        },
    })

    const data = (await res.json()) as OffersResponse

    return NextResponse.json(data.offers)
}
