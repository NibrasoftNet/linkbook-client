'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import ProductsDropdown from '@/components/items-select/ProductsDropdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import LocaleSwitcher from '@/components/LocaleSwitcher';
import WordRotate from '@/components/magicui/word-rotate';
import SearchProduct from '@/components/map/SearchProduct';
import NavbarItemsLanding from '@/components/navbar/NavbarItemsLanding';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import MobileMenuIcon from '@/icons/general/MobileMenu.icon';
import { RocketIcon } from '@/icons/landing';
import ChildIcon from '@/icons/landing/Child.icon';
import { frederickaTheGreat, imagesUrls } from '@/lib/constants';
import { useAuth } from '@/providers/AuthContext';

const styles = {
  socialIcons:
    'flex size-16 cursor-pointer items-center justify-center border-b-2 border-transparent',
  navBar:
    'fixed top-0 z-10 flex w-full max-w-[1300px] flex-col items-center pt-2',
  navBarItems:
    'z-10 flex h-[70px] w-full items-center justify-between rounded-2xl border border-primary px-6 bg-white dark:bg-black',
  childIconBtn:
    'flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400 hover:scale-105 transition-all ease-in-out cursor-pointer',
  rocketIcon:
    'flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400 hover:scale-105 transition-all ease-in-out cursor-pointer',
};

function Hero() {
  const t = useTranslations('Hero');
  const router = useRouter();
  const auth = useAuth();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  // Transform the y position of NavbarItemsLanding based on scroll progress
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7, 0.9],
    [0, -20, -70, -90, -100],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7, 1],
    [1, 1, 0.5, 0.2, 0],
  );
  const handleUserLogin = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth.session
      ? router.push(`/${auth.session.id}/feeds/details?page=1&limit=5`)
      : router.push('/sign-in');
  };
  return (
    <section
      id="linkbook-landing-hero"
      ref={targetRef}
      className="landing-section relative z-20 min-h-screen w-screen"
    >
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
            className="hidden object-contain md:block"
          />
          <div className="flex w-full items-center justify-end gap-4 md:w-fit">
            <ThemeSwitcher />
            <LocaleSwitcher />
            <button
              type="button"
              aria-label="login"
              onClick={() => handleUserLogin()}
              className={`${styles.childIconBtn}`}
            >
              {auth.session ? (
                <Avatar className="h-9 min-w-9 -rotate-45 rounded-md object-contain shadow-md hover:border md:min-h-10 md:min-w-10">
                  <AvatarImage
                    src={auth.session?.photo || imagesUrls.logoImage}
                    alt="linkbook-logo"
                  />
                  <AvatarFallback className="font-bold dark:text-zinc-950">
                    US
                  </AvatarFallback>
                </Avatar>
              ) : (
                <ChildIcon iconClass="w-12 h-12 text-primary -rotate-45" />
              )}
            </button>
            <div className={`${styles.rocketIcon}`}>
              <RocketIcon iconClass="w-16 h-16 text-primary -rotate-45" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`${styles.navBarItems} hidden md:flex`}
          style={{ y: translateY }}
        >
          <NavbarItemsLanding />
          <ProductsDropdown />
        </motion.div>
        <motion.div style={{ opacity }}>
          <WordRotate
            className={`${frederickaTheGreat.className}  mt-10 w-full text-center text-5xl font-bold text-tertiary md:text-8xl`}
            words={[t('hero_title'), t('hero_subTitle')]}
          />
        </motion.div>
      </nav>
      <motion.section className="top-0" style={{ opacity }}>
        <Image
          src={imagesUrls.heroImage}
          alt="landing-hero-image"
          width={1920}
          height={1076}
          unoptimized
          className="h-screen object-cover"
        />
      </motion.section>
      <Sheet>
        <SheetTrigger asChild className="fixed -left-2 top-0 z-10 md:hidden">
          <button
            type="button"
            aria-label="open menu"
            className="flex size-28 items-center justify-center p-1"
          >
            {/* <LiaHamburgerSolid className="size-10" /> */}
            <MobileMenuIcon iconClass="size-50" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader className="mb-4 flex w-full items-center justify-center">
            <SheetTitle>Linkbook</SheetTitle>
            <SheetDescription>
              <Image
                src={imagesUrls.logoImage}
                alt="landing-hero-image"
                width={80}
                height={80}
                unoptimized
                className="object-contain"
              />
            </SheetDescription>
          </SheetHeader>
          <NavbarItemsLanding />
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">User Details</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <SearchProduct page="home" />
    </section>
  );
}

export default Hero;
