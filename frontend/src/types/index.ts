/**
 * Global types and interfaces
 */

export interface Project {
  id: number;
  name: string;
  description: string;
  language?: string;
  stars: number;
  forks: number;
  url: string;
  qualityScore?: number;
  maturityLevel?: string;
  category?: string;
  license?: string;
  aiSummary?: string;
  readme?: string;
  lastUpdated?: string;
  commitsCount?: number;
  releasesCount?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  githubId: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  projectId: number;
  createdAt: string;
  updatedAt?: string;
  user?: User;
  likes?: number;
}

export interface SearchResult {
  projectId: number;
  name: string;
  relevanceScore: number;
  reason: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
