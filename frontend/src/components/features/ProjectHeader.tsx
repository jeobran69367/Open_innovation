'use client'

import { Project } from '@/types'
import { Badge, Button } from '@/components/ui'
import Link from 'next/link'

export interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {project.language && (
          <Badge variant="primary">{project.language}</Badge>
        )}
        {project.license && (
          <Badge variant="secondary">{project.license}</Badge>
        )}
        {project.maturityLevel && (
          <Badge variant="success">{project.maturityLevel}</Badge>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {project.name}
        </h1>
        <p className="text-lg text-muted max-w-3xl">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-6">
          <div>
            <p className="text-2xl font-semibold text-foreground">
              {project.stars || 0}
            </p>
            <p className="text-sm text-muted">Stars</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">
              {project.forks || 0}
            </p>
            <p className="text-sm text-muted">Forks</p>
          </div>
          {project.qualityScore && (
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {project.qualityScore}%
              </p>
              <p className="text-sm text-muted">Quality Score</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 ml-auto">
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">View on GitHub</Button>
          </Link>
          <Button variant="secondary">Save to Favorites</Button>
        </div>
      </div>
    </div>
  )
}
