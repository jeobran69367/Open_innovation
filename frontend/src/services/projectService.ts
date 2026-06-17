/**
 * Project Service - API calls for projects
 */

import { apiClient } from "@/lib/api";
import { Project, PaginatedResponse } from "@/types";

export const projectService = {
  /**
   * Get list of projects with pagination
   */
  async getProjects(
    page: number = 1,
    limit: number = 20,
    sortBy: string = "maturity_score",
    sortOrder: "asc" | "desc" = "desc",
    category?: string
  ): Promise<PaginatedResponse<Project>> {
    const skip = (page - 1) * limit;
    let url = `/v1/projects?skip=${skip}&limit=${limit}&sort_by=${sortBy}&sort_order=${sortOrder}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return apiClient.get(url);
  },

  /**
   * Get single project
   */
  async getProject(id: number): Promise<Project> {
    return apiClient.get(`/v1/projects/${id}`);
  },

  /**
   * Add project to favorites
   */
  async addToFavorites(projectId: number): Promise<{ detail: string }> {
    return apiClient.post(`/v1/projects/${projectId}/favorite`, {});
  },

  /**
   * Remove project from favorites
   */
  async removeFromFavorites(projectId: number): Promise<{ detail: string }> {
    return apiClient.delete(`/v1/projects/${projectId}/favorite`);
  },
};
