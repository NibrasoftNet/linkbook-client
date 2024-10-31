import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { getSession } from '@/actions/auth.actions';
import {
  ArrowThickIcon,
  ChildWhiteBgIcon,
  CircleIcon,
  DonationWhiteBgIcon,
  GroupWhiteBgIcon,
} from '@/icons/general';
import { frederickaTheGreat } from '@/lib/constants';

const styles = {
  jobMain:
    'flex size-full max-w-[1400px] flex-col items-center gap-10 text-center',
  jobCardMain:
    'flex size-[300px] -translate-x-3 -translate-y-3 flex-col items-center justify-center gap-2 rounded-[50px] border-4 bg-white',
  jobCardSub:
    'relative flex size-[100px] items-center justify-center rounded-full',
};

const OurJob = async () => {
  const t = useTranslations('OurJob');
  const session = await getSession();
  return (
    <section id="linkbook-landing-ourJobs" className="landing-section p-4">
      <div className={styles.jobMain}>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1
            className={`${frederickaTheGreat.className} pb-6 text-6xl text-primary`}
          >
            {t('title')}
          </h1>
          <p className="max-w-[500px] text-lg font-semibold">
            {t('description')}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 justify-around justify-items-center gap-4 md:grid-cols-3">
          <div className="col-span-1 size-[300px] rounded-[50px] border-2 border-primary text-primary">
            <div className={`${styles.jobCardMain} border-primary bg-white`}>
              <div className={`${styles.jobCardSub} bg-primary/30`}>
                <CircleIcon iconClass="size-[90%] absolute m-1 text-primary" />
                <ChildWhiteBgIcon iconClass="size-20 text-primary text-white relative" />
              </div>
              <h4 className="text-lg">{t('interestOne')}</h4>
              <h2 className="text-4xl font-bold capitalize">{t('people')}</h2>
              <Link
                href={
                  session?.user ? `/${session.user.id}/dashboard` : '/sign-in'
                }
              >
                <ArrowThickIcon iconClass="size-20 text-primary hover:rotate-45 transition-all ease-in-out duration-300" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 size-[300px] rounded-[50px] border-2 border-tertiary">
            <div
              className={`${styles.jobCardMain} border-tertiary text-tertiary`}
            >
              <div className={`${styles.jobCardSub} bg-tertiary/30`}>
                <CircleIcon iconClass="size-[90%] absolute m-1 text-tertiary" />
                <DonationWhiteBgIcon iconClass="size-16 text-primary text-white" />
              </div>
              <h4 className="text-lg">{t('interestTwo')}</h4>
              <h2 className="text-4xl font-bold capitalize">{t('economic')}</h2>
              <Link
                href={
                  session?.user ? `/${session.user.id}/dashboard` : '/sign-in'
                }
              >
                <ArrowThickIcon iconClass="size-20 text-tertiary hover:rotate-45 transition-all ease-in-out duration-300" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 size-[300px] rounded-[50px] border-2 border-primary">
            <div
              className={`${styles.jobCardMain} border-primary text-primary`}
            >
              <div className={`${styles.jobCardSub} bg-primary/30`}>
                <CircleIcon iconClass="size-[90%] absolute m-1 text-primary" />
                <GroupWhiteBgIcon iconClass="size-20 text-white" />
              </div>
              <h4 className="text-lg">{t('interestThree')}</h4>
              <h2 className="text-4xl font-bold capitalize">{t('social')}</h2>
              <Link
                href={
                  session?.user ? `/${session.user.id}/dashboard` : '/sign-in'
                }
              >
                <ArrowThickIcon iconClass="size-20 text-primary cursor-pointer hover:rotate-45 transition-all ease-in-out duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJob;
