'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Project, PaginatedResponse } from '@/types';
import { projectService } from '@/services/projectService';
import { ProjectCard } from '@/components/features/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/**
 * CatalogContent - main content component
 */
function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  // Parse query parameters
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  const sortBy = searchParams?.get('sort_by') || 'maturity_score';
  const sortOrder = (searchParams?.get('sort_order') || 'desc') as 'asc' | 'desc';
  const category = searchParams?.get('category') || undefined;

  // Update document title and meta tags
  useEffect(() => {
    const pageTitle = `Project Catalog - Page ${currentPage} | Open Innovation`;
    const pageDescription = `Discover mature and high-quality open source projects. Browse our curated catalog of ${pagination.total} projects.`;
    
    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription);
    
    // Open Graph tags
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDescription);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `${window.location.origin}/catalog?page=${currentPage}`);
  }, [currentPage, pagination.total]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectService.getProjects(
          currentPage,
          20,
          sortBy,
          sortOrder,
          category
        );
        setProjects(response.items);
        setPagination({
          total: response.total,
          page: response.page,
          pageSize: response.page_size,
          totalPages: response.total_pages,
          hasNext: response.has_next,
          hasPrevious: response.has_previous,
        });
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage, sortBy, sortOrder, category]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (sortBy !== 'maturity_score') params.set('sort_by', sortBy);
    if (sortOrder !== 'desc') params.set('sort_order', sortOrder);
    if (category) params.set('category', category);
    router.push(`/catalog?${params.toString()}`);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('sort_by', newSortBy);
    params.set('sort_order', newSortOrder);
    if (category) params.set('category', category);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-14">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Project Catalog</h1>
          <p className="text-base text-muted max-w-2xl">
            Discover mature and high-quality open source projects. Browse {pagination.total} projects sorted by maturity score.
          </p>
        </header>

        {/* Controls */}
        <Card className="p-6 flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'maturity_score' && sortOrder === 'desc' ? 'primary' : 'secondary'}
                onClick={() => handleSortChange('maturity_score', 'desc')}
              >
                Maturity (High to Low)
              </Button>
              <Button
                variant={sortBy === 'stars' && sortOrder === 'desc' ? 'primary' : 'secondary'}
                onClick={() => handleSortChange('stars', 'desc')}
              >
                Stars (High to Low)
              </Button>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="p-12 text-center">
            <p className="text-muted">Loading projects...</p>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </Card>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            <Card className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted">
                  Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
                  {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
                  {pagination.total} projects
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrevious}
                  >
                    Previous
                  </Button>
                  <span className="px-4 py-2 text-sm flex items-center">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && !error && (
          <Card className="p-12 text-center">
            <p className="text-muted">No projects found. Please try adjusting your filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * Catalog Page - with Suspense boundary for search params
 */
export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
