"use client";

/**
 * SearchBar Component - Global search bar with autocomplete
 */

import React, { useState, useRef, useEffect } from "react";
import { useSearch } from "@/hooks/useSearch";
import { AutocompleteSuggestion } from "@/types";

export const SearchBar: React.FC = () => {
  const {
    query,
    setQuery,
    suggestions,
    history,
    addToHistory,
    clearSearch,
    isLoading,
  } = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Display suggestions or history
  const displayItems =
    query.trim() === ""
      ? history.map((item) => ({
          type: "history" as const,
          label: item,
          value: item,
          description: undefined,
        }))
      : suggestions;

  // Handle keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < displayItems.length - 1 ? prev + 1 : prev
        );
        setIsOpen(true);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (selectedIndex >= 0 && displayItems[selectedIndex]) {
          selectSuggestion(displayItems[selectedIndex]);
        } else if (query.trim()) {
          submitSearch();
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setIsOpen(false);
        clearSearch();
        break;
      }
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion: AutocompleteSuggestion | any) => {
    const searchTerm =
      suggestion.type === "history" ? suggestion.value : suggestion.label;
    setQuery(searchTerm);
    addToHistory(searchTerm);
    // You could also trigger a full search here
    setIsOpen(false);
  };

  // Submit search
  const submitSearch = () => {
    if (query.trim()) {
      addToHistory(query);
      // Trigger full search - you might dispatch an action or navigate
      console.log("Searching for:", query);
      setIsOpen(false);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll("li");
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher des projets..."
          aria-label="Recherche globale"
          aria-autocomplete="list"
          aria-controls="search-listbox"
          aria-expanded={isOpen}
          aria-activedescendant={
            selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
          }
          className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {query && (
          <button
            onClick={clearSearch}
            type="button"
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {!query && (
          <span className="absolute right-3 text-sm text-gray-400 hidden sm:inline">
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">
              ⌘K
            </kbd>
          </span>
        )}
      </div>

      {isOpen && displayItems.length > 0 && (
        <ul
          ref={listboxRef}
          id="search-listbox"
          role="listbox"
          className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
        >
          {displayItems.map((item, index) => {
            const isHistory = "type" in item && item.type === "history";
            const isSelected = index === selectedIndex;

            return (
              <li
                key={`${item.value}-${index}`}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectSuggestion(item)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                } ${isHistory ? "border-t border-gray-200" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {isHistory && (
                    <svg
                      className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {!isHistory && (
                    <svg
                      className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 3a3 3 0 110 6H3a3 3 0 010-6h6zM9 13H6a3 3 0 00-3 3v3a3 3 0 003 3h3a3 3 0 003-3v-3a3 3 0 00-3-3z" />
                    </svg>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {isLoading && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Chargement...</span>
          </div>
        </div>
      )}
    </div>
  );
};
