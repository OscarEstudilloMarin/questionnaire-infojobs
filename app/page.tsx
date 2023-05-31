import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

import CreateOfferBtn from './create-offer-btn'
import OffersGrid from '@/components/offers-grid'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data } = await supabase.auth.getUser()

    const { data: user } = await supabase
        .from('user')
        .select('*')
        .eq('id', data.user?.id)
        .single()

    return (
        <main className="flex w-full flex-col gap-4 overflow-y-auto p-10">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="secondary" className="w-fit">
                        Cómo probar
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col">
                            <p>
                                Podéis crear una cuenta o bien usar los
                                siguientes usuarios de test:
                            </p>
                            <p className="font-semibold underline">CANDIDATE</p>
                            <p>
                                Username: candidate@test.com Password:
                                Candidate123!
                            </p>
                            <p className="font-semibold underline">EMPLOYER</p>
                            <p>
                                Username: employer@test.com Password:
                                Employer123!
                            </p>
                        </div>

                        <p className="font-semibold underline">PASOS</p>
                        <p>1. Iniciar sesión como employer</p>
                        <p>2. Crear oferta con formulario auto generado</p>
                        <p>3. Cerrar sesión e iniciar como candidate</p>
                        <p>4. Acceder a la oferta creada e inscribirse</p>
                        <p>5. Volver a iniciar sesión como employer</p>
                        <p>
                            6. Acceder a la oferta creada y ver las
                            inscripciones
                        </p>
                    </div>
                </PopoverContent>
            </Popover>

            <div className="mb-4 flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Ofertas</h1>
                {user?.type === 'employer' && <CreateOfferBtn />}
            </div>
            <OffersGrid
                creatorId={user?.type === 'employer' ? user?.id : undefined}
            />
        </main>
    )
}
