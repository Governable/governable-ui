'use client';
import dynamic from 'next/dynamic';

import Footer from '@/components/layout/footer/Footer';
import HomeHeader from './_components/HomeHeader';

const ActiveProposals = dynamic(
  async () => import('app/home/_components/ActiveProposals').then((mod) => mod),
  {
    ssr: false,
  },
);

const ExecutedProposals = dynamic(
  async () => import('app/home/_components/ExecutedProposals').then((mod) => mod),
  {
    ssr: false,
  },
);

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto flex h-full flex-1 flex-grow flex-row px-8 py-16">
        <ActiveProposals />
        <ExecutedProposals />
      </main>
      <Footer />
    </>
  );
}
