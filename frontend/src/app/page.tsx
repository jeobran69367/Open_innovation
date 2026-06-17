'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { TrendingProjectsSection } from '@/components/sections/TrendingProjectsSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { MaintainersCTASection } from '@/components/sections/MaintainersCTASection';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* Hero Section with Search */}
      <HeroSection onSearch={handleSearch} />

      {/* Trending Projects Section */}
      <TrendingProjectsSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Maintainers CTA Section */}
      <MaintainersCTASection />
    </>
  );
}
