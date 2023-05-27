export enum OfferFormFields {
    TITLE = 'title',
    CITY = 'city',
    CATEGORY = 'category',
    CONTRACT_TYPE = 'contractType',
    SALARY = 'salary',
    WORK_TYPE = 'workType',
    BANNER_IMAGE = 'bannerImage',
}

export type OfferFormState = {
    [OfferFormFields.TITLE]: string
    [OfferFormFields.CITY]: string
    [OfferFormFields.CATEGORY]: string // Category
    [OfferFormFields.CONTRACT_TYPE]: string // Categor
    [OfferFormFields.SALARY]: string
    [OfferFormFields.WORK_TYPE]: string
    [OfferFormFields.BANNER_IMAGE]: string
}

export const initialOfferFormState: OfferFormState = {
    title: '',
    city: '',
    category: '',
    contractType: '',
    salary: '',
    workType: '',
    bannerImage: '',
}
