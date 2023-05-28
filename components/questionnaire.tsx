'use client'

import { Button } from './ui/button'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Icons } from './icons'
import { toast } from '@/hooks/use-toast'
import { Card } from './ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function Questionnaire() {
    const [input, setInput] = useState('')
    const [number, setNumber] = useState<null | number>(null)
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<string[]>([])

    console.log('NUMBER', number)

    const handleSubmit = async (e: any) => {
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
            setQuestions(dataArray)
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
        <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center space-x-5">
                    <Textarea
                        placeholder="Preguntas sobre useEffect, useState y useMemo de nivel junior"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <Select
                        onValueChange={(value) => setNumber(Number(value) + 1)}
                    >
                        <SelectTrigger className="w-[180px]">
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
                    <Button type="submit" disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Accede
                    </Button>
                </div>
            </form>
            {questions.length > 0 && (
                <div className="space-y-3">
                    <p className="mt-5 text-xl font-bold">Preguntas</p>
                    <div className="space-y-2">
                        {questions.map((question, index) => (
                            <Card key={index} className="p-2">
                                <p>{question}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
