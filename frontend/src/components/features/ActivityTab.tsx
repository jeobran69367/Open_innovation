'use client'

import { Project } from '@/types'
import { Card } from '@/components/ui'

export interface ActivityTabProps {
  project: Project
}

export function ActivityTab({ project }: ActivityTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Repository Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted">Total Commits</p>
            <p className="text-3xl font-semibold text-foreground mt-2">
              {project.commitsCount || '0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Total Releases</p>
            <p className="text-3xl font-semibold text-foreground mt-2">
              {project.releasesCount || '0'}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
        <div className="flex items-center justify-center py-12 text-center">
          <p className="text-muted">Activity chart coming soon</p>
        </div>
      </Card>
    </div>
  )
}
