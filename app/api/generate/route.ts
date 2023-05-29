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
        content: `Quiero que generes [numero_preguntas] preguntas relacionadas a la descripción de trabajo que te pase. Las preguntas deben ser claras y concisas.

        El formato de respuesta tiene que seguir la siguiente estructura:
        ["question", "question", "question", "question", "question"]
        Tienes que cambiar "question" por la pregunta que quieras hacer y [numero_preguntas] por el número de preguntas que te pase.

        Por ejemplo, si te doy la decripción "Preguntas sobre como funciona useEffect, useMemo y useState en React de nivel junior", la respuesta con las preguntas podrían ser:

        ["¿Qué es useState en React y para qué se utiliza?", "¿Cuál es el propósito principal de useEffect en React?", "¿Cuándo deberías usar useMemo en React y por qué es útil?", "¿Cómo se utiliza useState para manejar un valor booleano en React?"]
        `,
    },
]

export async function POST(request: Request) {
    const { input, number } = (await request.json()) as {
        input?: string
        number?: number
    }

    if (!input) return new Response('Missing input', { status: 400 })

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
            ...INITIAL_MESSAGES,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `
                  Quiero que generes ${number} preguntas acerca de: ${input}. Las preguntas deben ser claras y concisas.
                `,
            },
        ],
    })

    const data = completion.data.choices[0].message?.content ?? ''

    try {
        return NextResponse.json({ data })
    } catch {
        return new Response('No se ha podido transformar el JSON', {
            status: 500,
        })
    }
}
