'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useRouter, useParams } from 'next/navigation'
import { Button } from '@repo/ui/src/components/button';
// import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname();
  const firstPathSegment = pathname.split('/')[1] || '';

  if (firstPathSegment === 'login' || firstPathSegment === 'register') {
    return null;
  }

  return (
    <header className='flex justify-between w-screen h-18 gap-4 bg-white border border-b-1 p-4 px-12'>
      <div className='flex gap-4 items-center'>
        <Link href='/'>
          <h3 className='font-bold text-xl mr-8'> ProBlocks </h3>
        </Link>
      </div>

      <div className='flex gap-4 items-center'>
        <Button className='rounded-full text-black bg-green-400 border-2 border-gray-500 hover:bg-green-500 hover:border-black'>
          {' '}
          Log in{' '}
        </Button>
      </div>
    </header>
  );
}
