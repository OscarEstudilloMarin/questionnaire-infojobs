'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(data: FormData) {
        setIsLoading(true)
        try {
            await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.name,
                        type: 'candidate',
                    },
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            toast({
                title: 'Registro exitoso',
                description:
                    'Hemos enviado un correo de confirmación a tu email.',
                variant: 'default',
            })

            reset()

            router.refresh()
        } catch (error: any) {
            toast({
                title: 'Registro fallido',
                description: 'Algo salió mal, por favor intenta de nuevo.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Nombre</Label>
                        <Input
                            id="name"
                            placeholder="john"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register('name')}
                        />
                        {errors?.name && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}

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

                        <Label htmlFor="email">Password</Label>
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
                        Registrate
                    </button>
                </div>
            </form>
        </div>
    )
}
