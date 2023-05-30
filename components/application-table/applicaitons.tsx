'use client'

import { Card } from '../ui/card'
import { columns } from './columns'
import { DataTable } from './data-table'
import useApplications from '@/hooks/use-applications'

const ApplicationsTable = ({ offerId }: { offerId: number }) => {
    const { applications } = useApplications({ offerId })
    if (!applications) return null
    return (
        <Card>
            <DataTable columns={columns} data={applications} />
        </Card>
    )
}

export default ApplicationsTable
