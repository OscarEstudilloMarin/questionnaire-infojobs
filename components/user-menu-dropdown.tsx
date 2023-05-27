'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUser from '@/hooks/use-user'

import { Session } from '@supabase/supabase-js'
import { Skeleton } from './ui/skeleton'

export default function UserMenuDropdown({
    session,
}: {
    session: Session | null
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const { logout, user, isLoading } = useUser(session)

    const handleLogOut = async () => {
        await logout()
        router.refresh()
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a space"
                    className="w-[150px] justify-between"
                >
                    <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                            src={`https://avatar.vercel.sh/${user?.id}.png`}
                            alt="user-avatar"
                        />
                        <AvatarFallback>
                            <Skeleton className="rounded-full" />
                        </AvatarFallback>
                    </Avatar>
                    {isLoading ? (
                        <Skeleton className="h-5 w-20 rounded-md" />
                    ) : (
                        <p className="truncate">{user?.name}</p>
                    )}

                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] p-2">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onSelect={handleLogOut}
                        className="cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
