import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SignupContent } from './SignupContent';

export const metadata: Metadata = {
  title: 'Create your Patina account',
  description:
    "Patina is pre-launch. Creating an account today makes you a member of the Founding Circle — you'll get honest letters from Leah as we build, and first access when the app launches.",
  openGraph: {
    title: 'Create your Patina account',
    description:
      "Patina is pre-launch. Creating an account today makes you a member of the Founding Circle — you'll get honest letters from Leah as we build, and first access when the app launches.",
    url: 'https://patina.cloud/signup',
  },
  alternates: {
    canonical: 'https://patina.cloud/signup',
  },
};

export default function SignupPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <SignupContent />
      </main>
      <Footer />
    </>
  );
}
