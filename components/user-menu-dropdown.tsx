'use client'

import { useState } from 'react'
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
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

export default function UserMenuDropdown({ user }: { user: User | null }) {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
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
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <p className="truncate">{user?.user_metadata.first_name}</p>
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] p-2">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onSelect={handleSignOut}
                        className="cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
