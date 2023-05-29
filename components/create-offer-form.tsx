'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { toast } from '@/hooks/use-toast'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from './ui/separator'
import { Icons } from './icons'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { Card } from './ui/card'

import { createOffer } from '@/service/offers-service'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    category: z.string().optional(),
    bannerImage: z.string().optional(),
    city: z.string().optional(),
    salary: z.string().optional(),
    workType: z.string().optional(),
    contractType: z.string().optional(),
    questions: z.array(z.string().nonempty()),
})

export type FormValues = z.infer<typeof FormSchema>

export default function CreateOfferForm() {
    const [input, setInput] = useState('')
    const [number, setNumber] = useState<null | number>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            bannerImage: '',
            city: '',
            salary: '',
            workType: '',
            contractType: '',
            questions: [],
        },
    })

    const { setValue, watch } = form

    const questionsWatch = watch('questions')

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        await createOffer({ offer: data })
        setLoading(false)
        router.push('/')
        toast({
            title: 'Oferta creada con éxito!',
            description: 'Puedes ver la nueva oferta en la página principal.',
            variant: 'default',
        })
    }

    const generateQuestions = async (e: any) => {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input, number }),
            })

            const responseString = await response.json()
            const dataArray: string[] = JSON.parse(responseString.data)
            setValue('questions', dataArray)
        } catch (error) {
            console.log('ERROR', error)
            setInput('')

            toast({
                title: 'Error',
                description: 'Ocurrió un error al generar las preguntas',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
            >
                <div className="flex justify-end">
                    <Button type="submit">Publicar</Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-auto max-w-md items-center gap-1.5">
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid max-w-md items-center gap-1.5">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea rows={2} {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Ciudad</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contractType"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Tipo de contrato</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="workType"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Tipo de trabajo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Salario</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bannerImage"
                        render={({ field }) => (
                            <FormItem>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <FormLabel>Imagen de banner</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="flex space-x-5">
                    <Textarea
                        placeholder="Preguntas sobre useEffect, useState y useMemo de nivel junior"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-[500px]"
                        rows={3}
                    />
                    <Select
                        onValueChange={(value) => setNumber(Number(value) + 1)}
                    >
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Número de preguntas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Array.from(Array(5).keys()).map((item) => (
                                    <SelectItem
                                        key={item}
                                        value={item.toString()}
                                    >
                                        {item + 1}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button onClick={generateQuestions} disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Generar
                    </Button>
                </div>

                {questionsWatch.length > 0 && (
                    <div className="space-y-3">
                        <p className="mt-5 text-xl font-bold">Preguntas</p>
                        <div className="space-y-2">
                            {questionsWatch.map((question, index) => (
                                <Card
                                    key={index}
                                    className="max-w-xs p-3 sm:max-w-sm md:max-w-md lg:max-w-xl"
                                >
                                    <p>{question}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </form>
        </Form>
    )
}
