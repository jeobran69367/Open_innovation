/**
 * useSearch - Hook for managing search state with debounce and localStorage
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { searchService } from "@/services/searchService";
import { AutocompleteSuggestion } from "@/types";

const SEARCH_HISTORY_KEY = "open_innovation_search_history";
const MAX_HISTORY_ITEMS = 10;
const DEBOUNCE_DELAY = 300;

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse search history:", error);
      }
    }
  }, []);

  // Fetch autocomplete suggestions
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchService.getAutocompleteSuggestions(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search handler
  const handleSearch = useCallback((value: string) => {
    setQuery(value);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, DEBOUNCE_DELAY);
  }, [fetchSuggestions]);

  // Add to search history
  const addToHistory = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item !== searchTerm);
      // Add to front and keep only MAX_HISTORY_ITEMS
      const updated = [searchTerm, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      // Save to localStorage
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setSuggestions([]);
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  return {
    query,
    setQuery: handleSearch,
    suggestions,
    history,
    addToHistory,
    clearSearch,
    clearHistory,
    isLoading,
  };
};
