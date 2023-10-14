export type productCategory = 'pc' | 'phone' | 'console' | 'tv' | '';
export type productBrand = 'apple' | 'microsoft' | 'sony' | '';

export interface Product {
  readonly _id: string;
  userId: string;
  title: string;
  category: productCategory;
  brand: productBrand;
  price: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number | null;
}

export type ProductCreate = Partial<
  Pick<
    Product,
    'title' | 'userId' | 'brand' | 'category' | 'price' | 'description'
  >
>;
