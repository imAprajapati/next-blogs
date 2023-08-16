'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
const CustomLink: React.FC<{
  title: string;
  href: string;
  className: string;
}> = ({ title, href, className }) => {
  const router = usePathname();
  return (
    <Link
      href={href}
      className={`relative group  ${
        router === href ? "text-blue-700" : "text-secondary-50"
      } ${className}`}
      passHref
    >
      {title}
      <span
        className={`h-[1px] inline-block  absolute 
        -bottom-0.5 left-0 group-hover:w-full transition-[width] 
        duration-500 ease ${
          router === href ? "w-full bg-blue-700" : "w-0 bg-secondary-50"
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};
export default function Navbar() {
  return (
   <header className='w-full sticky top-0 z-[999] shadow  h-16 border-b border-b-stone-300 bg-slate-50 flex items-center justify-between
   px-16'>
      <nav>
        <Link href="/" className='text-2xl font-bold'>Next Blogs</Link>
      </nav>
      <nav className='flex items-center justify-between space-x-6'>
        <CustomLink href="/" title="Home" className="" />
        <CustomLink href="/posts" title="Posts" className="" />
        <CustomLink href="/new-post" title="New Post" className="" />
        <CustomLink href="/login" title="SignIn" className="" />
      </nav>
   </header>
  )
}
