'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'

const FormSchema = z.object({
    cv: z.string().optional(),
    answers: z.array(z.string().nonempty()),
})

const ApplicationForm = () => {
    const questions = [
        '¿Qué es useState en React y para qué se utiliza?',
        '¿Cuál es el propósito principal de useEffect en React?',
        '¿Cuándo deberías usar useMemo en React y por qué es útil?',
        '¿Cómo se utiliza useState para manejar un valor booleano en React?',
    ]
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            cv: '',
            answers: Array(questions.length).fill(''),
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                        <FormItem>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <FormLabel>{'CV (opcional)'}</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <Separator />
                <div className="flex flex-col gap-4">
                    <Label>Questionario</Label>
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
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                            )
                        })}
                    </div>
                </div>
                <Separator />
                <Button className="w-full" type="submit">
                    Confirmar inscripción
                </Button>
            </form>
        </Form>
    )
}

export default ApplicationForm
