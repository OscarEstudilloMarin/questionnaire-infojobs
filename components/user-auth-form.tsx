'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export default function LoginForm() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })

    console.log('errors', errors)

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        try {
            const { data: user, error } =
                await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                })

            console.log('USER', user)

            if (error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
                return null
            }

            reset()
            router.refresh()
            router.push('/')
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register('email')}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...register('password')}
                        />
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Accede
                    </button>
                </div>
            </form>
        </div>
    )
}
