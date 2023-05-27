import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import type { SupabaseOfferWithUser } from '@/lib/collection'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function OfferPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data: offer } = (await supabase
        .from('offer')
        .select(`*, user (*)`)
        .match({ id })
        .single()) as { data: SupabaseOfferWithUser }

    return (
        <div className="w-2/3 p-5">
            <Card className="space-y-5 p-5">
                <div className="flex items-center gap-5">
                    <div className="h-fit w-1/4 rounded-md border-[1px] border-solid border-border bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://components.infojobs.com/statics/images/pic-company-logo.png"
                            alt="icon"
                            className="h-full w-full rounded-md object-cover"
                        />
                    </div>
                    <div className="sapce-y-3 flex flex-col">
                        <CardTitle className="text-2xl">
                            {offer?.title}
                        </CardTitle>
                        <CardDescription className="uppercase text-primary">
                            {offer?.user?.name}
                        </CardDescription>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="grid grid-cols-2 gap-5">
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                        <p>{offer?.category}</p>
                    </div>
                    <Button variant="secondary">
                        INSCRIBIRME EN ESTA OFERTA
                    </Button>
                </div>
            </Card>
        </div>
    )
}
