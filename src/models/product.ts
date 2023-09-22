export type productCategory = "pc" | "phone" | "console" | "tv" | ''
export type productBrand = "apple" | "microsoft" | "sony" | ''

export interface Product {
    _id?: string
    title: string 
    category: productCategory 
    brand: productBrand 
    price: string 
    description?: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number | null
}
