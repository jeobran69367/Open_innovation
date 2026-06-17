/**
 * Project Service - API calls for projects
 */

import { apiClient } from "@/lib/api";
import { Project, PaginatedResponse, Comment } from "@/types";

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
   * Get project comments
   */
  async getProjectComments(projectId: number): Promise<Comment[]> {
    return apiClient.get(`/v1/comments/${projectId}`);
  },

  /**
   * Add comment to project
   */
  async addComment(projectId: number, content: string): Promise<Comment> {
    return apiClient.post(`/v1/comments/${projectId}`, { content });
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
