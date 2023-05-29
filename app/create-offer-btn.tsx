'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function CreateOfferBtn() {
    const router = useRouter()
    return (
        <div className="flex justify-end">
            <Button
                variant="secondary"
                onClick={() => router.push('/create-offer')}
            >
                Crear oferta
            </Button>
        </div>
    )
}
