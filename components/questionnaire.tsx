'use client'

import { Button } from './ui/button'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Icons } from './icons'
import { toast } from '@/hooks/use-toast'
import { Input } from './ui/input'

export default function Questionnaire() {
    const [input, setInput] = useState('')
    const [number, setNumber] = useState(5)
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<string[]>([])

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
                        placeholder="Descripción"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <Input
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Accede
                    </Button>
                </div>
            </form>
            {questions.length > 0 && (
                <div>
                    <h2 className="mt-5 text-2xl font-bold">Preguntas</h2>
                    <ul className="mt-5">
                        {questions.map((question, index) => (
                            <li key={index} className="text-lg">
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
