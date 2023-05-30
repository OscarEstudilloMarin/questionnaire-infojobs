'use client'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

import { toast } from '@/hooks/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { SupabaseOfferWithUser } from '@/lib/collection'
import { useState } from 'react'
import { Icons } from './icons'

import { applyOffer } from '@/service/offers-service'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    cv: z.string().optional(),
    answers: z.array(z.string().nonempty()),
})

const ApplicationForm = ({ offer }: { offer: SupabaseOfferWithUser }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { questions } = offer

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            answers: Array(questions?.length).fill(''),
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true)

        await applyOffer(offer.id, questions, data.answers)

        setLoading(false)
        form.reset()
        toast({
            title: 'Inscripción realizada con éxito',
            variant: 'default',
        })
        router.push('/')
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-4">
                    <Label>Cuestionario</Label>
                    <div className="flex flex-col gap-1.5">
                        {questions.map((question, index) => {
                            return (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`answers.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{question}</FormLabel>
                                            <Textarea rows={2} {...field} />
                                        </FormItem>
                                    )}
                                />
                            )
                        })}
                    </div>
                </div>
                <Separator />
                <Button className="w-full" type="submit" disabled={loading}>
                    {loading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar inscripción
                </Button>
            </form>
        </Form>
    )
}

export default ApplicationForm
