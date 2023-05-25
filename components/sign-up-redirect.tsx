'use client'

import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

export default function SignUpRedirect() {
    const router = useRouter()

    return (
        <div className="flex w-full gap-2">
            <Button
                className="w-full"
                variant="secondary"
                onClick={() => router.push('/register/employer')}
            >
                Empresa
            </Button>
            <Button
                className="w-full"
                variant="secondary"
                onClick={() => router.push('/register/candidate')}
            >
                Candidato
            </Button>
        </div>
    )
}
