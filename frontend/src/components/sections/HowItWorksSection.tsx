/**
 * How it Works Section - 3 step process explanation
 */

'use client';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Recherchez',
    description:
      'Utiliser notre moteur de recherche alimenté par l\'IA pour découvrir les projets open source qui correspondent à vos besoins.',
    icon: '🔍',
  },
  {
    number: 2,
    title: 'Explorez',
    description:
      'Consultez les informations détaillées sur la maturité, la qualité et la communauté de chaque projet.',
    icon: '📊',
  },
  {
    number: 3,
    title: 'Contribuez',
    description:
      'Connectez-vous et commencez à contribuer aux projets qui vous intéressent le plus.',
    icon: '🚀',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ Comment ça marche?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trois étapes simples pour trouver et explorer les meilleurs projets open source
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Card */}
              <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-8 text-center h-full flex flex-col">
                {/* Step number circle */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6">{step.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector between steps (desktop only) */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-4 items-center justify-center"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent" />
                  <div className="ml-2 text-gray-400 dark:text-gray-600">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Recommandations Intelligentes
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Notre système IA analyse les tendances et recommande les projets les plus pertinents pour vous.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Évaluation de Qualité
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Accédez à des scores de qualité détaillés basés sur la maturité et l'activité du projet.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Communauté Active
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Connectez-vous avec d'autres contributeurs et mainteneurs passionnés.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                ✓
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Mise à Jour en Temps Réel
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Restez informé des derniers projets et des tendances en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
