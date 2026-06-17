'use client'

import { useState, useEffect } from 'react'
import { Project, Comment } from '@/types'
import { projectService } from '@/services/projectService'
import { Breadcrumb, Tabs, Card } from '@/components/ui'
import { ProjectHeader } from '@/components/features/ProjectHeader'
import { OverviewTab } from '@/components/features/OverviewTab'
import { ReadmeTab } from '@/components/features/ReadmeTab'
import { ActivityTab } from '@/components/features/ActivityTab'
import { CommunitySection } from '@/components/features/CommunitySection'

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [project, setProject] = useState<Project | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const projectId = parseInt(params.id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [projectData, commentsData] = await Promise.all([
          projectService.getProject(projectId),
          projectService.getProjectComments(projectId).catch(() => []),
        ])
        setProject(projectData)
        setComments(commentsData)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load project'
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      fetchData()
    }
  }, [projectId])

  const handleAddComment = async (content: string) => {
    try {
      const newComment = await projectService.addComment(projectId, content)
      setComments([newComment, ...comments])
    } catch (err) {
      console.error('Failed to add comment:', err)
      throw err
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="space-y-4">
            <div className="h-6 bg-surface rounded animate-pulse"></div>
            <div className="h-12 bg-surface rounded animate-pulse"></div>
            <div className="h-32 bg-surface rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Card className="text-center">
            <p className="text-danger">
              {error || 'Project not found'}
            </p>
          </Card>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.name },
  ]

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewTab project={project} />,
    },
    {
      id: 'readme',
      label: 'README',
      content: <ReadmeTab project={project} />,
    },
    {
      id: 'activity',
      label: 'Activity',
      content: <ActivityTab project={project} />,
    },
    {
      id: 'community',
      label: 'Community',
      content: (
        <CommunitySection
          projectId={projectId}
          comments={comments}
          onAddComment={handleAddComment}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 space-y-8">
        <Breadcrumb items={breadcrumbItems} />

        <ProjectHeader project={project} />

        <Tabs tabs={tabs} defaultTab="overview" />
      </div>
    </div>
  )
}
