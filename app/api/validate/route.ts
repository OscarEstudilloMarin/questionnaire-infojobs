import { NextResponse } from 'next/server'
import {
    Configuration,
    ChatCompletionRequestMessageRoleEnum,
    OpenAIApi,
} from 'openai'

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
    {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `Quiero que me digas qué nota del 0 al 10 pondrías al siguiente conjunto de respuestas. Quiero que tu respuesta siga exactamente el siguiente formato:
        
        {nota-total: 7}`,
    },
]

export async function POST(request: Request) {
    const { questions, answers } = (await request.json()) as {
        questions: string[]
        answers: string[]
    }

    if (questions.length === 0 || answers.length === 0)
        return new Response('Missing input', { status: 400 })

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
            ...INITIAL_MESSAGES,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `
                  Estas son las preguntas: ${questions}. Y estas las respuestas: ${answers}. 
                `,
            },
        ],
    })

    function getMark(texto: string) {
        const regex = /nota-total:\s(\d+)/
        const resultado = regex.exec(texto)
        if (resultado && resultado.length > 1) {
            return resultado[1]
        }
        return null
    }

    const data = getMark(completion.data.choices[0].message?.content!) ?? ''

    try {
        return NextResponse.json({ data })
    } catch {
        return new Response('No se ha podido transformar el JSON', {
            status: 500,
        })
    }
}
