import Image from 'next/image';
import React from 'react';

import { FaceBookIcon, XIcon } from '@/icons/landing';
import { imagesUrls } from '@/lib/constants';

import InstagramIcon from '../../icons/landing/Instagram.icon';

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
        {['welcome', 'shop', 'search', 'contact'].map((item: string) => (
          <li
            key={item}
            className="cursor-pointer font-bold capitalize hover:underline"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex h-full items-center justify-center gap-4">
        <div className="size-16 rounded-2xl border-2 border-primary bg-white">
          <div className="flex size-16 translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-2xl border-4 border-primary bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
            <FaceBookIcon iconClass="w-10 h-10" />
          </div>
        </div>
        <div className="size-16 rounded-2xl border-2 border-[#ff48aa] bg-white">
          <div className="flex size-16 translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-2xl border-4 border-[#ff48aa] bg-white transition duration-300 ease-in-out hover:translate-x-0 hover:translate-y-0">
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
