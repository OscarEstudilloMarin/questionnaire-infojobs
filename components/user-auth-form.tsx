'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Session } from '@supabase/auth-helpers-nextjs'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'

export default function LoginForm({ session }: { session: Session | null }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async () => {
        try {
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            toast({
                title: 'Check your email',
                description: 'We have sent you a confirmation email.',
                variant: 'default',
            })

            router.refresh()
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.error_description,
                variant: 'destructive',
            })
        }
    }

    const handleSignIn = async () => {
        try {
            await supabase.auth.signInWithPassword({
                email,
                password,
            })
            router.refresh()
            router.push('/')
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.error_description,
                variant: 'destructive',
            })
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    // for the `session` to be available on first SSR render, it must be
    // fetched in a Server Component and passed down as a prop
    return session ? (
        <Button onClick={handleSignOut}>Sign out</Button>
    ) : (
        <>
            <Input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Button onClick={handleSignUp}>Sign up</Button>
            <Button onClick={handleSignIn}>Sign in</Button>
        </>
    )
}
