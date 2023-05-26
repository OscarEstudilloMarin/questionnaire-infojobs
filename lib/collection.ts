// SUPABASE
import type { Database } from './database.types'

export type SupabaseOffer = Database['public']['Tables']['offer']['Row']
export type User = Database['public']['Tables']['user']['Row']

export type OffersResponse = {
    currentPage: number
    pageSize: number
    totalResults: number
    currentResults: number
    totalPages: number
    availableSortingMethods: string[]
    sortBy: string
    sinceDate: string
    items: Offer[]
    dataLayer: DataLayer
    queryParameters: QueryParameters
    eligibleForAutomaticAlertCreation: boolean
    offers: Offer[]
}

export interface DataLayer {
    offer_search_page: string
    offer_search_page_limit: string
    region_level2_id: string
}

export interface Offer {
    id: string
    title: string
    province: Category
    city: string
    link: string
    category: Category
    contractType: Category
    subcategory: Category
    salaryMin: Category
    salaryMax: Category
    salaryPeriod: Category
    experienceMin: Category
    workDay: Category
    study: Category
    teleworking: Category
    published: Date
    updated: Date
    author: Author
    requirementMin: string
    bold: boolean
    applications: string
    subSegment: number
    executive: boolean
    salaryDescription: string
    multiProvince: boolean
    urgent: boolean
    color: boolean
}

export interface Author {
    id: string
    privateId: number
    name: string
    uri: string
    logoUrl?: string
    corporateResponsive: boolean
    showCorporativeHeader: boolean
}

export interface Category {
    id: number
    value: string
}

export interface QueryParameters {
    study: any[]
    province: string[]
    salaryPeriod: string
    city: any[]
    contractType: any[]
    query: string
    experienceMin: any[]
    category: string[]
    workDay: any[]
    teleworking: any[]
}
