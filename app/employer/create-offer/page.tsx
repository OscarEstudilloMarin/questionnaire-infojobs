import BasePage from '@/components/common/layout/base-page/base-page'
import MainPage from '@/components/common/layout/main-page/main-page'
import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '@/components/ui/button'
import { Author, Category } from '@/lib/collection'
import OfferFormFields from '@/components/offers/input/OfferFormFields/offer-form-fields'
import OfferPreview from '@/components/offers/display/OfferPreview/OfferPreview'
import { initialOfferFormState } from '@/components/offers/input/OfferFormFields/offer-form-fields.types'
import OfferForm from '@/components/offers/layout/OfferForm'

// export interface Offer {
//     id: string
//     title: string
//     province: Category
//     city: string
//     link: string
//     category: Category
//     contractType: Category
//     subcategory: Category
//     salaryMin: Category
//     salaryMax: Category
//     salaryPeriod: Category
//     experienceMin: Category
//     workDay: Category
//     study: Category
//     teleworking: Category
//     published: Date
//     updated: Date
//     author: Author
//     requirementMin: string
//     bold: boolean
//     applications: string
//     subSegment: number
//     executive: boolean
//     salaryDescription: string
//     multiProvince: boolean
//     urgent: boolean
//     color: boolean
// }

export default function CreateOfferPage(): JSX.Element {
    return <OfferForm />
}
