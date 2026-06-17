/**
 * Search Service - API calls for search/RAG
 */

import { apiClient } from "@/lib/api";
import { SearchResult, AutocompleteSuggestion } from "@/types";

export const searchService = {
  /**
   * Semantic search with RAG
   */
  async semanticSearch(
    query: string,
    limit: number = 10
  ): Promise<SearchResult[]> {
    return apiClient.get(`/v1/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },

  /**
   * Get search suggestions
   */
  async getAutocompleteSuggestions(query: string): Promise<AutocompleteSuggestion[]> {
    return apiClient.get(`/v1/search/autocomplete?q=${encodeURIComponent(query)}`);
  },
};
