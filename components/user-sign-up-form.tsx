'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import useUser from '@/hooks/useUser'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
    const { signUp } = useUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams()

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const { data: loginData, error } = await signUp({
            email: data.email.toLowerCase(),
            password: data.password,
        })

        setIsLoading(false)

        if (data) {
            router.push('/')
            return toast({
                title: 'Registro exitoso',
                description: 'Gracias por confiar en infojobs.',
                variant: 'success',
            })
        }

        if (error) {
            return toast({
                title: 'Registro fallido',
                description: 'Algo salió mal, por favor intenta de nuevo.',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
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
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
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
