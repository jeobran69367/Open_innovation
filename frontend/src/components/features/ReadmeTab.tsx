'use client'

import { Project } from '@/types'
import { Card } from '@/components/ui'

export interface ReadmeTabProps {
  project: Project
}

export function ReadmeTab({ project }: ReadmeTabProps) {
  if (!project.readme) {
    return (
      <Card>
        <p className="text-muted">README content not available</p>
      </Card>
    )
  }

  return (
    <Card className="prose prose-sm max-w-none">
      <div className="whitespace-pre-wrap text-foreground">
        {project.readme}
      </div>
    </Card>
  )
}
