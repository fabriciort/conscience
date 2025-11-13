import React from 'react';
import { Header, Footer } from './components/layout';
import { Hero } from './components/home/Hero';
import { AudienceSegments } from './components/home/AudienceSegments';
import { Testimonials } from './components/home/Testimonials';
import { CTASection } from './components/home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AudienceSegments />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
