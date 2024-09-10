import { Fredericka_the_Great } from 'next/font/google';

export const imagesUrls = {
  logoImage: '/assets/images/logo-LinkBook.png',
  heroImage: '/assets/images/landing/hero.png',
  howItWorksImage: '/assets/images/landing/how_it_works.png',
  communityOfferImage01: '/assets/images/landing/community_offer01.png',
  communityOfferImage02: '/assets/images/landing/community_offer02.png',
};

export const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});
