'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useRouter, useParams } from 'next/navigation'
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const firstPathSegment = pathname.split('/')[1] || '';

  if (firstPathSegment === 'login' || firstPathSegment === 'register') {
    return null;
  }

  return (
    <header className='flex justify-between w-screen h-18 gap-4 bg-white border border-b-1 py-4 px-24'>
      <div className='flex gap-4 items-center'>
        <Link href='/'>
          <h3 className='font-bold text-xl mr-8'> ProBlocks </h3>
        </Link>
      </div>
    </header>
  );
}
