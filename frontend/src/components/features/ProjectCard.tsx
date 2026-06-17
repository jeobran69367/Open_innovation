'use client';

import { Project } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard component - displays a single project with key information
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'warning';
    return 'danger';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold truncate">{project.name}</h3>
            {project.category && (
              <Badge variant="secondary" className="mt-2">
                {project.category}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted line-clamp-2">
        {project.description || 'No description available'}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-2 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">Stars</span>
          <span className="font-semibold">{formatNumber(project.stars)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">Forks</span>
          <span className="font-semibold">{formatNumber(project.forks)}</span>
        </div>
        {project.language && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted">Language</span>
            <span className="font-semibold text-xs truncate">{project.language}</span>
          </div>
        )}
        {project.qualityScore !== undefined && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted">Quality</span>
            <span className="font-semibold">
              {(project.qualityScore * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* Scores */}
      <div className="flex gap-2 flex-wrap">
        {project.maturityLevel && (
          <Badge variant={getScoreColor(project.maturityLevel === 'Mature' ? 0.9 : 0.5)}>
            {project.maturityLevel}
          </Badge>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2 pt-4 border-t">
        <Link href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="primary" className="w-full" size="sm">
            View on GitHub
          </Button>
        </Link>
        <Link href={`/catalog/${project.id}`} className="flex-1">
          <Button variant="secondary" className="w-full" size="sm">
            Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
