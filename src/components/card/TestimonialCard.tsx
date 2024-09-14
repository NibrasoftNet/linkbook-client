import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Star } from 'lucide-react';
import React from 'react';
import { IoMdStopwatch } from 'react-icons/io';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TestimonialsPropsType } from '@/types/testimonials.type';

dayjs.extend(relativeTime);
export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialsPropsType;
}) => {
  return (
    <div className="z-10 flex size-[300px] flex-col gap-2 rounded-[50px] border-2 border-primary bg-white p-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-16 rounded-lg border-2 border-tertiary">
          <AvatarImage src={testimonial.user.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start">
          <h4 className="capitalize">
            {testimonial.user.firstName} {testimonial.user.lastName}
          </h4>
          <span className="flex items-center gap-2 text-sm text-slate-500">
            <IoMdStopwatch />
            {dayjs(testimonial.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-8 cursor-pointer ${
              star <= testimonial.rate
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="flex flex-1 items-center justify-center text-center text-sm font-semibold text-black">
        {testimonial.comment}
      </p>
    </div>
  );
};
