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
        content: `Quiero que puntues con una nota del 1 al 10 las siguientes respuestas. Cada respuesta tiene que valer lo mismo, y debe puntuarse con 0 si no se contesta o si la respuesta no tiene sentido o no se relaciona con la pregunta.

        El formato de tu respuesta tiene que ser la media de las notas de cada respuesta. Si la primera respuesta la puntúas con un 5 y la segunda con un 10, tu respuesta tiene que ser 7.5. El formato de respuesta es únicamente la nota, sin texto adicional.

        Por ejemplo, si te doy un array con dos preguntas ["¿Qué es useState en React y para qué se utiliza?", "¿Cuál es el propósito principal de useEffect en React?"] y las respuestas ["useState es un hook que se utiliza para manejar el estado de un componente en React", "useEffect es un hook que se utiliza para manejar el ciclo de vida de un componente en React"], la respuesta con la nota podría ser:

        7.5
        `,
    },
    {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `Por ejemplo, si te doy un array con dos preguntas ["¿Qué es useState en React y para qué se utiliza?", "¿Cuál es el propósito principal de useEffect en React?"] y las respuestas ["No lo sé", "No lo sé"], la respuesta con la nota podría ser:

        0
        `,
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
                  Dadas estas preguntas: ${questions}. Puntúa las siguientes respuestas: ${answers} devolviendo únicamente la media de las notas, sin texto adicional.
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