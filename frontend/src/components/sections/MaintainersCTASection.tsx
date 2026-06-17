/**
 * Maintainers CTA Section - Call to action for maintainers to claim their project
 */

'use client';

export function MaintainersCTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-blue-400 opacity-10 rounded-full blur-3xl dark:bg-blue-300" />
      <div className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-purple-400 opacity-10 rounded-full blur-3xl dark:bg-purple-300" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ✨ Vous maintenez un projet open source?
            </h2>
            <p className="text-lg opacity-90 mb-6 leading-relaxed">
              Revendiquez votre projet sur notre plateforme pour augmenter votre visibilité 
              et accumuler de nouvelles contributions de la part d'une communauté de développeurs engagés.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1">📈</span>
                <span>Augmentez la visibilité de votre projet auprès d'une communauté qualifiée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">👥</span>
                <span>Attirez de nouveaux contributeurs passionnés et compétents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">📊</span>
                <span>Accédez à des analyses détaillées sur votre projet et son impact</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">🎯</span>
                <span>Gérez facilement les contributions et les demandes de fusion</span>
              </li>
            </ul>

            {/* CTA Button */}
            <a
              href="#claim-project"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Revendiquer votre projet
            </a>
          </div>

          {/* Right side - Visual */}
          <div className="relative hidden md:block">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Devenez un projet vedette
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Augmentez votre impact dans la communauté
                  </p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 text-sm font-medium text-gray-900 dark:text-white">
              <div className="text-blue-600 font-bold">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Projets listés</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 text-sm font-medium text-gray-900 dark:text-white">
              <div className="text-purple-600 font-bold">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Utilisateurs actifs</div>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8">
          <a
            href="#claim-project"
            className="block w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Revendiquer votre projet
          </a>
        </div>
      </div>
    </section>
  );
}
