import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { FoundingPageContent } from './FoundingPageContent';

export const metadata: Metadata = {
  title: 'Join the Founding Circle — Patina',
  description:
    'Be part of building a new kind of furniture platform. Founding Circle members get first access, real influence, and behind-the-scenes updates from the team.',
  openGraph: {
    title: 'The Founding Circle — Patina',
    description: "We're building something different. Come help us shape it.",
    url: 'https://patina.cloud/founding',
  },
  alternates: {
    canonical: 'https://patina.cloud/founding',
  },
};

export default function FoundingPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <FoundingPageContent />
      </main>
      <Footer />
    </>
  );
}
