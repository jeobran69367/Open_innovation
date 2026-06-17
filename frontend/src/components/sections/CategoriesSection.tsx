/**
 * Categories Section - Popular categories with icons
 */

'use client';

interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  count: number;
}

const POPULAR_CATEGORIES: Category[] = [
  {
    id: 'web',
    name: 'Web Frameworks',
    icon: '🌐',
    emoji: '🌐',
    color: 'from-blue-500 to-cyan-500',
    count: 1240,
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    icon: '🤖',
    emoji: '🤖',
    color: 'from-purple-500 to-pink-500',
    count: 856,
  },
  {
    id: 'cli',
    name: 'CLI Tools',
    icon: '⌨️',
    emoji: '⌨️',
    color: 'from-gray-600 to-gray-900',
    count: 723,
  },
  {
    id: 'mobile',
    name: 'Mobile Dev',
    icon: '📱',
    emoji: '📱',
    color: 'from-green-500 to-emerald-500',
    count: 512,
  },
  {
    id: 'database',
    name: 'Databases',
    icon: '🗄️',
    emoji: '🗄️',
    color: 'from-orange-500 to-red-500',
    count: 634,
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: '🚀',
    emoji: '🚀',
    color: 'from-indigo-500 to-blue-500',
    count: 445,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🏷️ Catégories Populaires
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explorez nos catégories pour trouver les projets qui vous intéressent
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className="group relative overflow-hidden rounded-lg p-6 sm:p-8 text-left transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl active:scale-95"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
              />
              
              {/* White background for contrast */}
              <div className="absolute inset-0 bg-white dark:bg-slate-800 group-hover:bg-opacity-95 dark:group-hover:bg-opacity-90 transition-all duration-300 -z-10" />
              
              {/* Border */}
              <div className="absolute inset-0 border border-gray-200 dark:border-slate-700 group-hover:border-opacity-50 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl md:text-6xl mb-4 inline-block group-hover:scale-125 transition-transform duration-300">
                  {category.emoji}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>

                {/* Count */}
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {category.count} projets
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* View all categories */}
        <div className="text-center mt-12">
          <button className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Voir toutes les catégories
          </button>
        </div>
      </div>
    </section>
  );
}
