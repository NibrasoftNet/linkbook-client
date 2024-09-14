// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
// eslint-disable-next-line import/no-extraneous-dependencies
import { devtools, persist } from 'zustand/middleware';

import type { CategoryTypeValue, CityTypeValue } from '@/types/category.type';
import type { SearchProductsTypeValue } from '@/types/product.type';
import type { SearchServiceProps } from '@/types/search.type';
import type { TestimonialsPropsType } from '@/types/testimonials.type';
import { SearchTypeEnum } from '@/types/types';

interface SearchProps {
  type: SearchTypeEnum;
  category: number;
  city: string;
  searchResults: SearchServiceProps[];
  setType: (type: SearchTypeEnum) => void;
  setCategory: (category: number) => void;
  setCity: (city: string) => void;
  setSearchResults: (results: SearchServiceProps[]) => void;
  allCities: CityTypeValue[];
  allCategories: CategoryTypeValue[];
  allTestimonials: TestimonialsPropsType[];
  setAllCities: (cities: CityTypeValue[]) => void;
  setAllCategories: (categories: CategoryTypeValue[]) => void;
  allProducts: SearchProductsTypeValue[];
  setAllProducts: (products: SearchProductsTypeValue[]) => void;
  setAllTestimonials: (testimonials: TestimonialsPropsType[]) => void;
}

const useSearchStore = create<SearchProps>()(
  devtools(
    persist(
      (set) => ({
        type: SearchTypeEnum.DONATIONS,
        category: 0,
        city: '',
        searchResults: [],
        allCities: [],
        allCategories: [],
        allProducts: [],
        allTestimonials: [],
        setType: (type: SearchTypeEnum) => set({ type }),
        setCategory: (category: number) => set({ category }),
        setCity: (city: string) => set({ city }),
        setSearchResults: (results: SearchServiceProps[]) =>
          set({ searchResults: results }),
        setAllCities: (cities: CityTypeValue[]) => set({ allCities: cities }),
        setAllCategories: (categories: CategoryTypeValue[]) =>
          set({ allCategories: categories }),
        setAllProducts: (product: SearchProductsTypeValue[]) =>
          set({ allProducts: product }),
        setAllTestimonials: (testimonials: TestimonialsPropsType[]) =>
          set({ allTestimonials: testimonials }),
      }),
      { name: 'searchStore' },
    ),
  ),
);

export default useSearchStore;
