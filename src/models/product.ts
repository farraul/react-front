export enum SelectProductBrand {
  Apple = 'apple',
  microsoft = 'microsoft',
  Sony = 'sony',
}

export type ProductCategory = 'pc' | 'phone' | 'console' | 'tv' | '';
export type ProductBrand =
  | SelectProductBrand.Apple
  | SelectProductBrand.microsoft
  | SelectProductBrand.Sony;

export interface Product {
  readonly _id: string;
  userId: string;
  title: string;
  category: ProductCategory;
  brand: ProductBrand;
  price: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number | null;
}

export type ProductCreate = Partial<
  Pick<Product, 'title' | 'userId' | 'brand' | 'category' | 'price' | 'description'>
>;
