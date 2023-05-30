'use client'

import { useState } from 'react'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import useApplications from '@/hooks/use-applications'
import { SupabaseApplicationWithUser } from '@/lib/collection'
import dayjs from 'dayjs'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Icons } from './icons'

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
    const [loading, setLoading] = useState(false)
    const supabase = createClientComponentClient<Database>()

    const donwloadCV = async () => {
        setLoading(true)
        const { data, error } = await supabase.storage
            .from('candidate-cv')
            .download(application.user.cv!)
        if (data) {
            const blobUrl = window.URL.createObjectURL(data)
            const tempLink = document.createElement('a')
            tempLink.href = blobUrl
            tempLink.setAttribute('download', `${application.user.name}-cv.pdf`)
            tempLink.click()
        }

        if (error) {
            console.log(error)
            return
        }

        setLoading(false)
    }

    return (
        <Card className="space-y-5 p-5">
            <CardTitle>Candidato: {application.user.name}</CardTitle>
            <div>Nota del questionario: {application.form_mark}</div>
            <div className="flex flex-col">
                <div className="text-sm ">Respuestas:</div>
                <CardContent className="text-sm text-gray-600">
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
                </CardContent>
            </div>
            <div className="text-sm">
                Fecha de inscripción:{' '}
                {dayjs(application.created_at).format('DD/MM/YYYY HH:mm')}
            </div>
            <div className="flex justify-end">
                <Button onClick={donwloadCV}>
                    {loading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Descargar CV
                </Button>
            </div>
        </Card>
    )
}

const ApplicationsList = ({ offerId }: { offerId: number }) => {
    const { applications, isLoading } = useApplications({ offerId })

    return (
        <>
            <p className="mb-5 text-2xl font-semibold">Inscripciones:</p>
            <div className="flex flex-col gap-5">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <ApplicationSkeleton key={i} />
                      ))
                    : applications?.map((application) => {
                          return (
                              <ApplicationCard
                                  key={application.id}
                                  application={application}
                              />
                          )
                      })}
            </div>
        </>
    )
}

export default ApplicationsList
