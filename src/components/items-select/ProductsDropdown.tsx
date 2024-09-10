'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CartIcon, CircleIcon } from '@/icons/general';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthContext';
import type { SearchProductsTypeValue } from '@/types/product.type';
import { ProductTypeEnum } from '@/types/product.type';
import useSearchStore from '@/zustand/searchStore';

const ProductsDropdown = () => {
  const { allProducts } = useSearchStore();
  const auth = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<SearchProductsTypeValue | undefined>(
    allProducts[0],
  );

  const handleProductSelect = () => {
    if (auth.session) {
      if (product?.type === ProductTypeEnum.DONATIONS) {
        router.push(`/${auth.session.id}/donations/product?id=${product?.id}`);
      } else if (product?.type === ProductTypeEnum.SWAPS) {
        router.push(`/${auth.session.id}/swaps/product?id=${product?.id}`);
      } else {
        router.push(`/${auth.session.id}/purchases`);
      }
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between rounded-full',
              !product?.value && 'text-muted-foreground',
            )}
          >
            {product?.value
              ? allProducts.find(
                  (prod: SearchProductsTypeValue) =>
                    prod.value === product.value,
                )?.label
              : 'Select a category'}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No products found.</CommandEmpty>
              <CommandGroup>
                {allProducts.map((prod: SearchProductsTypeValue) => (
                  <CommandItem
                    value={prod.label}
                    key={prod.value}
                    onSelect={() => {
                      setProduct(prod);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        prod.value === product?.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {prod.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <button
        type="button"
        aria-label="search-btn"
        className="relative flex size-12 items-center justify-center rounded-full bg-tertiary p-2 hover:text-tertiary/30"
        onClick={handleProductSelect}
      >
        <div className="absolute flex size-10 items-center justify-center rounded-full p-2">
          <CartIcon iconClass="size-10 text-white" />
        </div>
        <CircleIcon iconClass="relative size-12 text-white" />
      </button>
    </div>
  );
};

export default ProductsDropdown;
