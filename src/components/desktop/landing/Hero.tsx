'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import NavbarItemsLanding from '@/components/desktop/NavbarItemsLanding';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import SearchProduct from '@/components/map/SearchProduct';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { CartIcon } from '@/icons/general';
import { FaceBookIcon, RocketIcon, XIcon } from '@/icons/landing';
import ChildIcon from '@/icons/landing/Child.icon';
import InstagramIcon from '@/icons/landing/Instagram.icon';
import { imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';
import { useGetAllCitiesQuery } from '@/tanstack/address.query';

const styles = {
  socialIcons:
    'flex size-16 cursor-pointer items-center justify-center border-b-2 border-transparent',
  navBar:
    'fixed top-0 z-10 flex w-full max-w-[1300px] flex-col items-center pt-2',
  navBarItems:
    'z-10 flex h-[70px] w-full items-center justify-between rounded-2xl border border-primary bg-white px-6',
  childIconBtn:
    'flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400 hover:scale-105 transition-all ease-in-out cursor-pointer',
  rocketIcon:
    'flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400 hover:scale-105 transition-all ease-in-out cursor-pointer',
};

function Hero() {
  const router = useRouter();
  const auth = useAuth();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  // Transform the y position of NavbarItemsLanding based on scroll progress
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const handleUserLogin = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth.session
      ? router.push(`/${auth.session.id}/dashboard`)
      : router.push('/sign-in');
  };
  const cities = useGetAllCitiesQuery();
  if (cities.isFetching) {
    return <TableSkeleton />;
  }
  return (
    <section ref={targetRef} className="landing-section z-20">
      <nav className={`${styles.navBar}`}>
        <motion.div
          style={{ opacity }}
          className="flex w-full items-center justify-between pb-2"
        >
          <Image
            src={imagesUrls.logoImage}
            alt="landing-hero-image"
            width={120}
            height={75}
            unoptimized
            className="object-contain"
          />
          <div className="flex h-full items-center justify-center gap-4">
            <Link
              href="/facebook"
              className={`${styles.socialIcons} hover:border-primary`}
            >
              <FaceBookIcon iconClass="w-10 h-10" />
            </Link>
            <Link
              href="/x"
              className={`${styles.socialIcons} hover:border-black`}
            >
              <XIcon iconClass="w-8 h-8" />
            </Link>
            <Link
              href="/instagram"
              className={`${styles.socialIcons} hover:border-[#ff48aa]`}
            >
              <InstagramIcon iconClass="w-10 h-10" />
            </Link>
          </div>
          <div className="flex h-full items-center gap-4">
            <ThemeSwitcher />
            <LocaleSwitcher />
            <button
              type="button"
              aria-label="login"
              onClick={() => handleUserLogin()}
              className={`${styles.childIconBtn}`}
            >
              {auth.session?.photo || (
                <ChildIcon iconClass="w-16 h-16 text-primary -rotate-45" />
              )}
            </button>
            <div className={`${styles.rocketIcon}`}>
              <RocketIcon iconClass="w-16 h-16 text-primary -rotate-45" />
            </div>
          </div>
        </motion.div>
        {/*        <div className="flex w-full justify-end gap-4">
          <button
            type="button"
            aria-label="login"
            className="px-3 h-8 cursor-pointer rounded-t-2xl bg-primary text-lg font-semibold text-white hover:bg-primary/50"
          >
            {t('signIn')}
          </button>
          <button
            type="button"
            aria-label="login"
            className="px-2 h-8 cursor-pointer rounded-t-2xl bg-primary text-lg font-semibold text-white hover:bg-primary/50"
          >
            {t('signUp')}
          </button>
        </div> */}
        <motion.div
          className={`${styles.navBarItems}`}
          style={{ y: translateY }}
        >
          <NavbarItemsLanding />
          <CartIcon iconClass="w-12 h-12 text-[#ff4d16]" />
        </motion.div>
      </nav>
      <motion.section className="top-0" style={{ opacity }}>
        <Image
          src={imagesUrls.heroImage}
          alt="landing-hero-image"
          width={1920}
          height={1076}
          unoptimized
          className="object-cover"
        />
      </motion.section>
      <SearchProduct page="home" />
    </section>
  );
}

export default Hero;
