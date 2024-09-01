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
  categoryId: number;
  image: ImagesProps[];
};
