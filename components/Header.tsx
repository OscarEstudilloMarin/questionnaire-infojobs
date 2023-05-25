'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import type { Session, User } from '@supabase/auth-helpers-nextjs'
import { usePathname } from 'next/navigation'

import UserMenuDropdown from './user-menu-dropdown'

export default function Header({
    session,
    user,
}: {
    session: Session | null
    user: User | null
}) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <header className="flex h-20 w-full items-center justify-between p-5">
            <Image
                src="/icons/ij-logo-default_primary.svg"
                alt="infojobs-icon"
                width={120}
                height={100}
                onClick={() => router.push('/')}
            />
            {session ? (
                <UserMenuDropdown user={user} />
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
