/**
 * Hero Section - Main landing page header with search
 */

'use client';

import { useState } from 'react';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6">
            🔍 Open Innovation
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
            Découvrez les meilleurs projets open source avec l'intelligence artificielle
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des projets, technologies, catégories..."
              className="flex-1 px-4 py-3 md:py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              Rechercher
            </button>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Populaires:</span>
            {['React', 'Python', 'Machine Learning', 'Web Framework'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
