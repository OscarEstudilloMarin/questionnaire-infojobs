'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import UserMenuDropdown from './user-menu-dropdown'
import { Session } from '@supabase/supabase-js'

export default function Header({ session }: { session: Session | null }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <header className="flex h-20 w-full items-center justify-between border-b-[1px] border-solid border-[#e6e6e6] bg-white p-5">
            <Image
                src="/icons/ij-logo-default_primary.svg"
                alt="infojobs-icon"
                width={120}
                height={100}
                priority
                onClick={() => router.push('/')}
                className="height-auto cursor-pointer"
            />
            {session ? (
                <UserMenuDropdown session={session} />
            ) : pathname !== '/login' ? (
                <div className="flex gap-4">
                    <Button size="sm" onClick={() => router.push('/login')}>
                        Login
                    </Button>
                </div>
            ) : null}
        </header>
    )
}
