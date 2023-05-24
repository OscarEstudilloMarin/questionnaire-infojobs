'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'
import useUser from '@/hooks/useUser'

const Header = async () => {
    const router = useRouter()
    const pathname = usePathname()

    const { user } = useUser()

    return (
        <header className="flex h-20 w-full items-center justify-between bg-[#0083B0] bg-gradient-to-r from-[#00B4DB] to-[#0083B0] p-5">
            <Image
                src="/icons/ij-logo-default_primary.svg"
                alt="infojobs-icon"
                width={120}
                height={100}
                onClick={() => router.push('/')}
            />
            {pathname === '/login' ? null : (
                <div className="flex gap-4">
                    <Button size="sm" onClick={() => router.push('/login')}>
                        Login
                    </Button>
                </div>
            )}
        </header>
    )
}

export default Header
