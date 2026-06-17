'use client';

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/20 text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-40">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-60 -right-60 h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-success/5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <Badge variant="primary">🚀 Nouvelle Plateforme</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Découvrez l'Open Source qui change tout
                </h1>
                <p className="text-xl text-muted max-w-2xl leading-relaxed">
                  Open Innovation vous connecte aux meilleurs projets open source du monde. Basée sur l'IA et le Machine Learning, notre plateforme identifie les projets matures et pertinents pour vos besoins.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Commencer l'exploration →
                </Button>
                <Button variant="secondary" className="text-lg px-8 py-4">
                  Voir la démo
                </Button>
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <p className="text-muted">Projets analysés</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <p className="text-muted">Utilisateurs actifs</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <p className="text-muted">Précision IA</p>
                </div>
              </div>
            </div>

            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl"></div>
              <Card className="relative bg-gradient-to-br from-surface to-surface/50 border-2 border-primary/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-sm font-semibold text-success">Analyse en temps réel</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-border rounded-full w-3/4"></div>
                    <div className="h-3 bg-border rounded-full w-4/5"></div>
                    <div className="h-3 bg-border rounded-full w-2/3"></div>
                  </div>
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted mb-3">Catégories détectées:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success">React 18.2</Badge>
                      <Badge variant="primary">Accessible</Badge>
                      <Badge variant="warning">Mature</Badge>
                      <Badge variant="secondary">1.2K Stars</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-surface via-surface to-primary/5 border-2 border-primary/30 shadow-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Trouvez votre prochain projet</h2>
                <p className="text-muted">Recherchez par technologie, domaine ou mots-clés</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    id="search"
                    label=""
                    placeholder="React, Machine Learning, API REST..."
                    className="mb-0"
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="primary" className="w-full sm:w-auto h-12 text-lg">
                    🔍 Rechercher
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border">
                <button className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition text-sm font-semibold text-primary text-left">
                  Frontend
                </button>
                <button className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition text-sm font-semibold text-primary text-left">
                  Backend
                </button>
                <button className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition text-sm font-semibold text-primary text-left">
                  DevOps
                </button>
                <button className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition text-sm font-semibold text-primary text-left">
                  AI/ML
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-4 py-20 sm:py-32 bg-surface/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-black">Pourquoi Open Innovation?</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              La plateforme complète pour explorer l'open source intelligemment
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">🤖</div>
                <h3 className="text-2xl font-bold">Curation IA avancée</h3>
                <p className="text-muted leading-relaxed">
                  Algorithmes de Machine Learning pour découvrir les projets les plus pertinents adaptés à vos besoins spécifiques.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Analyse en temps réel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Scoring intelligent
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Recommandations précises
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">⚡</div>
                <h3 className="text-2xl font-bold">Données mises à jour</h3>
                <p className="text-muted leading-relaxed">
                  Accès instantané aux informations fraîches et vérifiées sur chaque projet open source.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> Mise à jour quotidienne
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> Statistiques GitHub live
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> Alertes nouveautés
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">🔐</div>
                <h3 className="text-2xl font-bold">Sécurisé & Fiable</h3>
                <p className="text-muted leading-relaxed">
                  Respect de votre vie privée avec infrastructure sécurisée et confidentielle.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-warning">✓</span> Chiffrement end-to-end
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-warning">✓</span> Zéro tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-warning">✓</span> Certifications ISO
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">📊</div>
                <h3 className="text-2xl font-bold">Analyse détaillée</h3>
                <p className="text-muted leading-relaxed">
                  Métriques complètes et tableaux de bord pour comprendre chaque projet en profondeur.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> 50+ métriques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Tendances historiques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Comparaisons
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 5 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-danger/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">👥</div>
                <h3 className="text-2xl font-bold">Communauté active</h3>
                <p className="text-muted leading-relaxed">
                  Connectez-vous avec d'autres développeurs et contributeurs open source.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-danger">✓</span> Forums de discussion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-danger">✓</span> Showcases projets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-danger">✓</span> Événements
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 6 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="text-5xl">🔌</div>
                <h3 className="text-2xl font-bold">Intégrations</h3>
                <p className="text-muted leading-relaxed">
                  Intégrez facilement avec vos outils de développement préférés.
                </p>
                <ul className="space-y-2 text-sm pt-4 border-t border-border/50">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> API REST complète
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> WebHooks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> Plugins IDE
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-2 border-primary/30">
            <div className="relative z-10 text-center space-y-8">
              <h2 className="text-5xl sm:text-6xl font-black leading-tight">
                Prêt à explorer l'open source?
              </h2>
              <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Rejoignez des milliers de développeurs qui transforment leur découverte de projets open source avec Open Innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button variant="primary" className="text-lg px-8 py-4">
                  🚀 Démarrer gratuitement
                </Button>
                <Button variant="secondary" className="text-lg px-8 py-4">
                  📖 Lire la documentation
                </Button>
              </div>
              <p className="text-sm text-muted pt-4">
                Pas de carte de crédit requise. Accès illimité aux 50K+ projets.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
