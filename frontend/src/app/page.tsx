export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🔍 Open Innovation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Découvrez les meilleurs projets open source avec l'intelligence artificielle
        </p>
        
        {/* TODO: Add Search Bar */}
        {/* TODO: Add Featured Projects */}
        {/* TODO: Add CTA Buttons */}

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Bienvenue!</h2>
          <p className="text-gray-600 mb-4">
            Cette plateforme est en développement. La structure de base a été créée.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Frontend: Next.js 14 configuré</li>
            <li>Backend: FastAPI prêt à développer</li>
            <li>Infrastructure: Docker Compose configuré</li>
            <li>CI/CD: GitHub Actions workflows créés</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
