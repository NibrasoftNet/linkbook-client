'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTestimonialMutation } from '@/tanstack/testimonial.query';
import type { TestimonialFormValues } from '@/validations/create-testimonial-schema.validation';
import { testimonialSchema } from '@/validations/create-testimonial-schema.validation';

export function TestimonialDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Testimonial');
  const {
    mutateAsync: mutateCreateTestimonial,
    isLoading: isCreateTestimonialLoading,
  } = useCreateTestimonialMutation();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rate: 0,
      comment: '',
    },
  });

  async function onSubmit(values: TestimonialFormValues) {
    const toastId = toast('Begins...');
    toast.loading('Loading...', {
      description: 'Submitting...',
      id: toastId,
    });

    try {
      const { status, message } = await mutateCreateTestimonial(values);
      if (!status) {
        toast.error('Failed', {
          description: Object.values(JSON.parse(message)).join(', '),
        });
        toast.dismiss(toastId);
        return;
      }
      toast.success('Success', {
        description: 'Operation Successful',
        id: toastId,
      });
      setOpen(false);
    } catch (e) {
      toast.dismiss(toastId);
      toast.error('Error', {
        description: `${e}`,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t('testimonial_btn')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('testimonial_btn')}</DialogTitle>
          <DialogDescription>{t('testimonial_subTitle')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-8 cursor-pointer ${
                            star <= field.value
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>{t('testimonial_rate')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('testimonial_comment')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('testimonial_details')}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('testimonial_details')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isCreateTestimonialLoading} type="submit">
                {t('testimonial_submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
