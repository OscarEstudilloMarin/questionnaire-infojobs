import AppliedOffersGrid from '@/components/applied-offers-grid'

export default function MyApplicationsPage() {
    return (
        <div className="flex flex-1 flex-col gap-8">
            <h1 className="text-2xl font-bold">Ofertas aplicadas</h1>
            <AppliedOffersGrid />
        </div>
    )
}
