'use client';

import { Button } from '@/components/ui/button';
import styles from '@/styles/page.module.css';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';

export default function Home() {
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const moreContentRef = useRef<HTMLDivElement>(null);

  const handleReadMore = () => {
    if (moreContentRef.current) {
      moreContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <main className='min-h-[100dvh] grid place-items-center'>
        <div className={`${styles.main} grid `}>
          <p className='text-center text-[4rem]'> Welcome to my website</p>
          <span className='block text-center mb-5 text-[2.5rem]' >
            My name is <span className={styles.gradientSpan}>Thang</span>
          </span>
          <a href="mycv.pdf" target="_blank" rel="noopener noreferrer" className='block mx-auto'>
            <Button variant='outline' className='rounded-xl bg-transparent hover:bg-[#B3B3B3] border-[#B3B3B3]'>
              Download my CV
            </Button>
          </a>

        </div>
      </main>
    </>
  );
}
