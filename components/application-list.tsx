'use client'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import useApplications from '@/hooks/use-applications'
import { SupabaseApplicationWithUser } from '@/lib/collection'
import dayjs from 'dayjs'
import { Skeleton } from './ui/skeleton'

const ApplicationSkeleton = () => {
    return (
        <Card className="space-y-5 p-5">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-3 w-2/4" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-2/4" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-2/5" />
            </div>
            <Skeleton className="h-3 w-2/4" />
        </Card>
    )
}

const ApplicationCard = ({
    application,
}: {
    application: SupabaseApplicationWithUser
}) => {
    return (
        <Card className="space-y-5 p-5">
            <CardTitle>{application.user.name}</CardTitle>
            <div>Nota del questionario: {application.form_mark}</div>
            <div className="flex flex-col">
                <div>Respuestas:</div>
                <CardDescription>
                    {application.answers!.map((answer, index) => {
                        return (
                            <div key={index} className="flex gap-2">
                                <span className="font-semibold">
                                    {index + 1}.
                                </span>
                                <div>{answer}</div>
                            </div>
                        )
                    })}
                </CardDescription>
            </div>
            <div className="text-sm">
                Fecha de inscripción:{' '}
                {dayjs(application.created_at).format('DD/MM/YYYY HH:mm')}
            </div>
        </Card>
    )
}

const ApplicationsList = ({ offerId }: { offerId: number }) => {
    const { applications, isLoading } = useApplications({ offerId })

    return (
        <>
            <h1 className="mb-5 text-2xl font-semibold">Inscripciones:</h1>
            <div className="flex flex-col gap-5">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <ApplicationSkeleton key={i} />
                      ))
                    : applications?.map((application) => {
                          return ApplicationCard({ application })
                      })}
            </div>
        </>
    )
}

export default ApplicationsList
