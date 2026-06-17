/**
 * Project Service - API calls for projects
 */

import { apiClient } from "@/lib/api";
import { Project, PaginatedResponse } from "@/types";

export const projectService = {
  /**
   * Get list of projects
   */
  async getProjects(
    skip: number = 0,
    limit: number = 20
  ): Promise<PaginatedResponse<Project>> {
    return apiClient.get(`/v1/projects?skip=${skip}&limit=${limit}`);
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
