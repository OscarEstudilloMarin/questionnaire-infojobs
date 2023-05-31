'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { userAuthSchema } from '@/lib/validations/auth'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Database } from '@/lib/database.types'

type FormData = z.infer<typeof userAuthSchema>

export function UserSignUpForm({ from }: { from: string }) {
    const router = useRouter()
    const { toast } = useToast()
    const supabase = createClientComponentClient<Database>()

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
            const { data: authData } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            if (authData && authData.user) {
                let cvBucket = null
                if (data.cv && data.cv.length > 0) {
                    const cvFile = data.cv[0]
                    const { data: bucket } = await supabase.storage
                        .from('candidate-cv')
                        .upload(`${authData.user.id}-cv.pdf`, cvFile)
                    cvBucket = bucket
                }

                await supabase.from('user').insert([
                    {
                        id: authData.user.id,
                        name: data.name,
                        type: from,
                        cv: cvBucket?.path,
                    },
                ])
            }

            toast({
                title: 'Registro exitoso',
                description:
                    'Hemos enviado un correo de confirmación a tu email.',
                variant: 'default',
            })

            reset()

            router.refresh()
        } catch (error: any) {
            console.log('error', error)
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
        <div className="grid gap-6">
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
                        {from === 'candidate' && (
                            <>
                                <Label htmlFor="cv">CV (opcional)</Label>
                                <Input
                                    id="cv"
                                    type="file"
                                    disabled={isLoading}
                                    {...register('cv')}
                                />
                            </>
                        )}
                    </div>
                    <Button variant="secondary" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Registrate
                    </Button>
                </div>
            </form>
        </div>
    )
}
