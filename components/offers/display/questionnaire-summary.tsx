import { SupabaseOfferWithUser } from '@/lib/collection'

import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function QuestionnaireSummary({
    offer,
}: {
    offer: SupabaseOfferWithUser
}) {
    const { questions } = offer

    return (
        <Card className="space-y-5 p-5">
            <CardTitle>Resumen del cuestionario</CardTitle>
            <CardContent>
                {questions.map((question, index) => {
                    return (
                        <div key={index} className="flex gap-2">
                            <span className="font-semibold">{index + 1}.</span>
                            <div>{question}</div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
