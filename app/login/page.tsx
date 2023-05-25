import { Metadata } from 'next'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { cn } from '@/lib/utils'

import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'

import LoginForm from '@/components/user-auth-form'
import SignUpRedirect from '@/components/sign-up-redirect'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account',
}

export default async function LoginPage() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center px-10">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute left-4 top-4 md:left-8 md:top-8'
                )}
            >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Te esperan miles de ofertas
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Introduce email y contraseña
                    </p>
                </div>
                <LoginForm />
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-slate-600">
                            No tienes cuenta? Registrate
                        </span>
                    </div>
                </div>
                <SignUpRedirect />
            </div>
        </div>
    )
}
