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
    description: z.string().nonempty(),
    category: z.string().nonempty(),
    banner_image: z.string().optional(),
    city: z.string().nonempty(),
    salary: z.string().nonempty(),
    work_type: z.string().nonempty(),
    contract_type: z.string().nonempty(),
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
            banner_image: '',
            city: '',
            salary: '',
            work_type: '',
            contract_type: '',
            questions: [],
        },
    })

    const { setValue, watch } = form

    const questionsWatch = watch('questions')

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        try {
            await createOffer({ offer: data })
            setLoading(false)
            router.push('/')
            toast({
                title: 'Oferta creada con éxito!',
                description:
                    'Puedes ver la nueva oferta en la página principal.',
                variant: 'default',
            })
        } catch (error) {
            console.error(error)
        }
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
                className="flex w-full flex-col gap-8"
            >
                <div className="flex flex-row">
                    <h1 className="flex-1 text-3xl font-bold">Crear oferta</h1>
                    <Button type="submit">Publicar</Button>
                </div>
                <h2 className="text-lg font-medium text-gray-400">
                    Añade a continuación la información de tu oferta. Esta será
                    visualizada por los candidatos.
                </h2>

                <div className="my-8 flex w-full flex-col gap-6 sm:flex-row">
                    <div className="flex flex-1 flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-auto  items-center gap-1.5">
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
                                    <div className="grid  items-center gap-1.5">
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
                                    <div className="grid w-full  items-center gap-1.5">
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
                                    <div className="grid w-full  items-center gap-1.5">
                                        <FormLabel>Ciudad</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 sm:justify-between">
                        <FormField
                            control={form.control}
                            name="contract_type"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-full  items-center gap-1.5">
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
                            name="work_type"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-full  items-center gap-1.5">
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
                                    <div className="grid w-full  items-center gap-1.5">
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
                            name="banner_image"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-full items-center gap-1.5">
                                        <FormLabel>Imagen de banner</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <p className="mb-4 mt-5 text-xl font-bold">Preguntas</p>
                        {questionsWatch.length > 0 ? (
                            <div className="space-y-2">
                                {questionsWatch.map((question, index) => (
                                    <Card
                                        key={index}
                                        className="md: max-w-xs p-3 sm:max-w-sm lg:max-w-xl"
                                    >
                                        <p>{question}</p>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="my-4 text-gray-400">
                                No has generado ningún formulario todavía
                            </p>
                        )}
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <p className="mt-5 text-xl font-bold">Parámetros</p>
                        <p>Qué preguntas quieres generar?</p>
                        <Textarea
                            placeholder="Preguntas sobre useEffect, useState y useMemo de nivel junior"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            className="flex-1"
                            rows={3}
                        />
                        <p>Cuántas preguntas quieres generar?</p>
                        <Select
                            onValueChange={(value) =>
                                setNumber(Number(value) + 1)
                            }
                        >
                            <SelectTrigger className="flex-1">
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

                        <Button
                            onClick={generateQuestions}
                            disabled={loading}
                            className="mt-3"
                        >
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Generar
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}
