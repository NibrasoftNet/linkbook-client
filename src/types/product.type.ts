import type { ImagesProps } from '@/types/types';

export type ProductCategoryValueType = {
  id: number;
  name: string;
  image: string | null;
};

export type ProductValueType = {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
};

export type ProductProps = {
  id: number;
  name: string;
  brand: string;
  modal: string;
  size: number;
  stock: number;
  price: number;
  description: string;
  category: ProductCategoryProps;
  image: ImagesProps[];
};

export type ProductCategoryProps = {
  id: number;
  name: string;
  image: ImagesProps;
};

export enum ProductTypeEnum {
  'DONATIONS' = 'DONATIONS',
  'SWAPS' = 'SWAPS',
  'PURCHASES' = 'PURCHASES',
}

export type SearchProductsTypeValue = {
  id: number;
  label: string;
  value: string;
  type: ProductTypeEnum;
};
