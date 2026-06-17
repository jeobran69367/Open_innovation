'use client'

import { Project } from '@/types'
import { Card } from '@/components/ui'

export interface OverviewTabProps {
  project: Project
}

export function OverviewTab({ project }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {project.aiSummary && (
        <Card>
          <h3 className="text-lg font-semibold mb-3">AI Summary</h3>
          <p className="text-muted leading-relaxed">
            {project.aiSummary}
          </p>
        </Card>
      )}

      <Card>
        <h3 className="text-lg font-semibold mb-4">Project Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted">Maturity Level</p>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {project.maturityLevel || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Quality Score</p>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {project.qualityScore ? `${project.qualityScore}%` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Last Updated</p>
            <p className="text-base text-foreground mt-1">
              {project.lastUpdated
                ? new Date(project.lastUpdated).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Category</p>
            <p className="text-base text-foreground mt-1">
              {project.category || 'N/A'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
