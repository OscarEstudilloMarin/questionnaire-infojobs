'use client'

import { Button } from '@/components/ui/button'
import { Icons } from './icons'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <Button onClick={() => router.back()} variant="ghost">
            <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Volver
            </>
        </Button>
    )
}

export default BackButton
