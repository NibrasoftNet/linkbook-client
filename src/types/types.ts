import type { ComponentType } from 'react';

export interface ApiResponse<T> {
  status: boolean;
  path: string;
  statusCode: number;
  result: T;
}

export interface TranslateBody {
  // inputLanguage: string;
  // outputLanguage: string;
  topic: string;
  paragraphs: string;
  essayType: string;
  type?: 'review' | 'refactor' | 'complexity' | 'normal';
}

export interface TranslateResponse {
  code: string;
}

export interface AxiosCustomResponse<T> {
  status: boolean;
  path: string;
  statusCode: number;
  result: T;
}

export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface Customer {
  id: string /* primary key */;
  stripe_customer_id?: string;
}

export interface Product {
  id: string /* primary key */;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface UserDetails {
  id: string /* primary key */;
  firstName: string;
  lastName: string;
  photo?: string;
}

export interface Price {
  id: string /* primary key */;
  product_id?: string /* foreign key to products.id */;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  interval_count?: number;
  trial_period_days?: number | null;
  products?: Product;
}

export interface PriceWithProduct extends Price {}

export interface Subscription {
  id: string /* primary key */;
  user_id: string;
  price_id?: string /* foreign key to prices.id */;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

export interface IRoute {
  path: string;
  name: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  disabled?: boolean;
  icon?: JSX.Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  rightElement?: boolean;
  invisible?: boolean;
}

export interface EssayBody {
  topic: string;
  words: '300' | '200';
  essayType: '' | 'Argumentative' | 'Classic' | 'Persuasive' | 'Critique';
  apiKey?: string | undefined;
}
export interface PremiumEssayBody {
  words: string;
  topic: string;
  essayType:
    | ''
    | 'Argumentative'
    | 'Classic'
    | 'Persuasive'
    | 'Memoir'
    | 'Critique'
    | 'Compare/Contrast'
    | 'Narrative'
    | 'Descriptive'
    | 'Expository'
    | 'Cause and Effect'
    | 'Reflective'
    | 'Informative';
  tone: string;
  citation: string;
  level: string;
  apiKey?: string | undefined;
}

export enum SearchTypeEnum {
  'DONATIONS' = 'DONATIONS',
  'SWAPS' = 'SWAPS',
  'PURCHASES' = 'PURCHASES',
}

export enum CrudOperationsEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
