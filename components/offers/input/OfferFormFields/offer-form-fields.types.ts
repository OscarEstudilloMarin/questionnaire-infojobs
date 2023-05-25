export enum OfferFormFields {
    TITLE = 'title',
    DESCRIPTION = 'description',
    PROVINCE = 'province',
    CITY = 'city',
    IMAGE = 'image',
    CATEGORY = 'category',
    CONTRACT_TYPE = 'contractType',
    SALARY_MIN = 'salaryMin',
    SALARY_MAX = 'salaryMax',
    EXPERIENCE_MIN = 'experienceMin',
    WORK_DAY = 'workDay',
    STUDY = 'study',
    TELEWORKING = 'teleworking',
    APPLICATIONS = 'applications',
    SALARY_DESCRIPTION = 'salaryDescription',
}

export type OfferFormState = {
    [OfferFormFields.TITLE]: string
    [OfferFormFields.DESCRIPTION]: string
    [OfferFormFields.PROVINCE]: string
    [OfferFormFields.CITY]: string
    [OfferFormFields.IMAGE]: string
    [OfferFormFields.CATEGORY]: string // Category
    [OfferFormFields.CONTRACT_TYPE]: string // Category
    [OfferFormFields.SALARY_MIN]: number
    [OfferFormFields.SALARY_MAX]: number
    [OfferFormFields.EXPERIENCE_MIN]: number
    [OfferFormFields.WORK_DAY]: boolean
    [OfferFormFields.STUDY]: string // Category
    [OfferFormFields.TELEWORKING]: boolean
    [OfferFormFields.APPLICATIONS]: string
    [OfferFormFields.SALARY_DESCRIPTION]: string
}

export const initialOfferFormState: OfferFormState = {
    title: '',
    description: '',
    province: '',
    city: '',
    image: '',
    category: '',
    contractType: '',
    salaryMin: 0,
    salaryMax: 0,
    experienceMin: 0,
    workDay: false,
    study: '',
    teleworking: false,
    applications: '',
    salaryDescription: '',
}
