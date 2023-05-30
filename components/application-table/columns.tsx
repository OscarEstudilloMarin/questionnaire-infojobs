'use client'
import { SupabaseApplicationWithUser } from '@/lib/collection'
import { ColumnDef } from '@tanstack/react-table'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowUpDown } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

export const columns: ColumnDef<SupabaseApplicationWithUser>[] = [
    {
        accessorKey: 'user.name',
        header: 'Nombre',
    },
    {
        accessorKey: 'form_mark',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Nota
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Fecha de inscripción
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const application = row.original
            const supabase = createClientComponentClient<Database>()

            const donwloadCV = async () => {
                const { data, error } = await supabase.storage
                    .from('candidate-cv')
                    .download(application.user.cv!)
                if (data) {
                    const blobUrl = window.URL.createObjectURL(data)
                    const tempLink = document.createElement('a')
                    tempLink.href = blobUrl
                    tempLink.setAttribute(
                        'download',
                        `${application.user.name}-cv.pdf`
                    )
                    tempLink.click()
                }

                if (error) {
                    console.log(error)
                    return
                }
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <PlusCircle className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{`Inscripción de ${application.user.name}`}</DialogTitle>
                            <div>
                                <div className="flex flex-col">
                                    <div>Respuestas:</div>
                                    <div className="ml-5 text-sm text-gray-600">
                                        {application.answers!.map(
                                            (answer, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex gap-2"
                                                    >
                                                        <span className="font-semibold">
                                                            {index + 1}.
                                                        </span>
                                                        <div>{answer}</div>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            {application.user.cv && (
                                <Button onClick={donwloadCV}>
                                    Descargar CV
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]
