'use client';

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-14">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-surface p-6 shadow-surface">
          <div>
            <Badge variant="primary">Design System</Badge>
            <h1 className="mt-4 text-4xl font-semibold">
              Open Innovation
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Plateforme intelligente pour découvrir des projets open source matures.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <Card className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">La base du design system</h2>
              <p className="mt-2 text-muted">
                Couleurs, composants et mode clair/sombre sont déjà définis pour un rendu cohérent.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Action principale</Button>
              <Button variant="secondary">Secondaire</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Fantôme</Button>
            </div>
          </div>

          <div className="space-y-5">
            <Input id="search" label="Rechercher un projet" description="Tapez un mot-clé pour démarrer" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Succès</Badge>
              <Badge variant="warning">Avertissement</Badge>
              <Badge variant="danger">Urgence</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Accessibilité et expérience</h2>
          <p className="mt-3 text-muted">
            Le design system est conçu avec une hiérarchie de couleurs accessibles, des boutons focusables et des composants respectant la navigation clavier.
          </p>
        </Card>
      </div>
    </div>
  )
}
