/**
 * Trending Projects Section - Shows top 6 projects of the week
 */

'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectService } from '@/services/projectService';
import Link from 'next/link';

export function TrendingProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await projectService.getProjects(0, 6);
        setProjects(response.items);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📈 Projets Tendance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Les meilleurs projets open source de la semaine
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-100 dark:bg-slate-800 rounded-lg h-48"
              />
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Project header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.name}
                  </h3>
                  {project.category && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">⭐ {project.stars.toLocaleString()}</span>
                  <span className="flex items-center gap-1">🔀 {project.forks.toLocaleString()}</span>
                </div>

                {/* Language badge */}
                {project.language && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {project.language}
                    </span>
                  </div>
                )}

                {/* Quality score */}
                {project.qualityScore && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Score</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(project.qualityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${project.qualityScore * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* View button */}
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Voir plus →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Aucun projet disponible pour le moment
            </p>
          </div>
        )}

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
          >
            Voir tous les projets
          </Link>
        </div>
      </div>
    </section>
  );
}
