import useSWR from 'swr'
import { SupabaseApplicationWithUser } from '@/lib/collection'
import { getApplicationsByOffer } from '@/service/applications-service'

const useApplications = ({ offerId }: { offerId?: number } = {}) => {
    const { data: applications, isLoading } = useSWR<
        SupabaseApplicationWithUser[]
    >('applications', () => getApplicationsByOffer({ offerId }))
    return { applications, isLoading }
}

export default useApplications
