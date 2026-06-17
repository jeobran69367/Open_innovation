/**
 * useSearch Hook Tests
 */

import { renderHook, act } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';

describe('useSearch Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should initialize with empty state', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current.query).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.history).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  test('should add search term to history', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addToHistory('test search');
    });

    expect(result.current.history).toContain('test search');
  });

  test('should not add empty search terms to history', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addToHistory('   ');
    });

    expect(result.current.history).toHaveLength(0);
  });

  test('should clear search', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test');
    });

    expect(result.current.query).toBe('test');

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.query).toBe('');
    expect(result.current.suggestions).toEqual([]);
  });

  test('should persist history to localStorage', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addToHistory('saved search');
    });

    const saved = localStorage.getItem('open_innovation_search_history');
    expect(saved).toBeTruthy();
    expect(JSON.parse(saved || '[]')).toContain('saved search');
  });

  test('should clear history', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addToHistory('test1');
      result.current.addToHistory('test2');
    });

    expect(result.current.history).toHaveLength(2);

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toHaveLength(0);
    expect(localStorage.getItem('open_innovation_search_history')).toBeNull();
  });

  test('should prevent duplicate history entries', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addToHistory('duplicate');
      result.current.addToHistory('duplicate');
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toBe('duplicate');
  });

  test('should maintain max history items limit', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      for (let i = 0; i < 15; i++) {
        result.current.addToHistory(`search${i}`);
      }
    });

    expect(result.current.history).toHaveLength(10);
  });
});
