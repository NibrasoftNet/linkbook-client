import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { FaceBookIcon, XIcon } from '@/icons/landing';
import { imagesUrls } from '@/lib/constants';

import InstagramIcon from '../../icons/landing/Instagram.icon';

interface Item {
  title: string;
  link: string;
  scroolTo: boolean;
}

const items: Item[] = [
  { title: 'Home', link: '#linkbook-landing-hero', scroolTo: true },
  { title: 'About', link: '#linkbook-landing-ourJobs', scroolTo: false },
  { title: 'Contact', link: '/contact', scroolTo: false },
];

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-4 p-2">
      <Image
        src={imagesUrls.logoImage}
        alt="landing-hero-image"
        width={100}
        height={75}
        unoptimized
        className="object-contain"
      />
      <ul className="flex w-full max-w-[1000px] items-center justify-between border-y-2 border-slate-200 p-4">
        {items.map((item: Item) => (
          <Link
            key={item.title}
            href={item.link}
            scroll={item.scroolTo}
            className="underline-hover cursor-pointer font-bold capitalize"
          >
            {item.title}
          </Link>
        ))}
      </ul>
      <div className="flex h-full items-center justify-center gap-4">
        <div className="size-16 rounded-2xl border-2 border-primary bg-white">
          <div className="flex size-16 translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-2xl border-4 border-primary bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
            <FaceBookIcon iconClass="w-10 h-10" />
          </div>
        </div>
        <div className="size-16 rounded-2xl border-2 border-[#cb017b] bg-white">
          <div className="flex size-16 translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-2xl border-4 border-[#cb017b] bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
            <InstagramIcon iconClass="w-10 h-10" />
          </div>
        </div>
        <div className="size-16 rounded-2xl border-2 border-black bg-white">
          <div className="flex size-16 translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-2xl border-4 border-black bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
            <XIcon iconClass="w-10 h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
