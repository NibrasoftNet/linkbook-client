import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  AcademyHelmetIcon,
  CartIcon,
  CircleIcon,
  CurvedArrowIcon,
  CurvedArrowLeftIcon,
  StickIcon,
} from '@/icons/general';
import { frederickaTheGreat } from '@/lib/constants';

const cards = [
  {
    title: 'shopping',
    icon: <CartIcon iconClass="size-20 text-white" />,
    colorClass: 'border-tertiary text-tertiary bg-tertiary',
    textColor: 'text-tertiary',
  },
  {
    title: 'education/training',
    icon: <AcademyHelmetIcon iconClass="size-20 text-white" />,
    colorClass: 'border-primary text-primary bg-primary',
    textColor: 'text-primary',
  },
  {
    title: 'entertainment',
    icon: <StickIcon iconClass="size-20 text-white" />,
    colorClass: 'border-tertiary text-tertiary bg-tertiary',
    textColor: 'text-tertiary',
  },
];

const OurActivities = () => {
  const t = useTranslations('Landing');

  return (
    <section className="landing-section relative w-screen overflow-hidden bg-blue-100 p-4">
      <Image
        src="/assets/images/landing/our_services.png"
        alt="our_service"
        fill
        className="absolute size-full"
      />
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-4 text-center">
        <h1
          className={`${frederickaTheGreat.className} mb-16 pb-6 text-6xl capitalize text-primary`}
        >
          {t('our_activities')}
        </h1>
        <div className="relative flex justify-center overflow-visible">
          <div className="grid w-full grid-cols-1 md:grid-cols-3">
            {cards.map((card) => {
              return (
                <div key={card.title} className="col-span-1 shrink-0 p-4">
                  <div
                    className={`${card?.colorClass} h-[220px] w-full rounded-[50px] border-2 bg-white text-center`}
                  >
                    <div
                      className={`${card?.colorClass} relative flex h-full -translate-x-3 -translate-y-3 flex-col items-center gap-2 rounded-[50px] border-4 bg-white`}
                    >
                      <div
                        className={`${card?.colorClass} absolute -top-16 flex items-center justify-center rounded-full p-2`}
                      >
                        <div className="absolute flex size-[130px] items-center justify-center rounded-full p-2">
                          {card?.icon}
                        </div>
                        <CircleIcon iconClass="relative size-[120px] text-white" />
                      </div>
                      <div
                        className={`${card?.textColor} relative flex size-full flex-col items-center justify-center gap-2 pt-6`}
                      >
                        <h2 className="text-4xl font-bold capitalize">
                          {card?.title}
                        </h2>
                        <h4 className="text-xl capitalize">
                          interest group of
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8 flex w-full justify-center gap-4">
          <button
            type="button"
            aria-label="shift-right"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-tertiary/30 hover:bg-tertiary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-tertiary group-hover:text-white" />
            <CurvedArrowIcon iconClass="size-8 text-tertiary relative group-hover:text-white" />
          </button>
          <button
            type="button"
            aria-label="shift-left"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
            <CurvedArrowLeftIcon iconClass="size-8 text-primary relative group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurActivities;
