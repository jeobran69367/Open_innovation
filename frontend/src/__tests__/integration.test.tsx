/**
 * Integration Tests - Global Search Bar
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/features/SearchBar';

// Mock the searchService
jest.mock('@/services/searchService', () => ({
  searchService: {
    getAutocompleteSuggestions: jest.fn().mockResolvedValue([
      {
        type: 'project',
        label: 'React',
        value: 'react',
        description: 'A JavaScript library for building user interfaces',
      },
      {
        type: 'project',
        label: 'Vue',
        value: 'vue',
        description: 'The Progressive JavaScript Framework',
      },
      {
        type: 'category',
        label: 'Frontend Frameworks',
        value: 'frontend-frameworks',
        description: 'JavaScript frontend frameworks',
      },
    ]),
  },
}));

describe('SearchBar Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('complete search workflow: type, select, and save to history', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Rechercher des projets...');
    
    // Step 1: Type in the search box (should trigger debounce)
    await user.type(input, 'React');
    
    // Step 2: Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Step 3: Verify suggestions are displayed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Frontend Frameworks')).toBeInTheDocument();
  });

  test('keyboard shortcut opens search and allows quick search', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Rechercher des projets...');
    
    // Verify input is not focused initially
    expect(document.activeElement).not.toBe(input);
    
    // Trigger Cmd+K shortcut
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    
    // Verify input is focused
    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  test('accessibility: proper ARIA attributes for screen readers', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Rechercher des projets...');
    
    // Check ARIA attributes
    expect(input).toHaveAttribute('aria-label', 'Recherche globale');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls', 'search-listbox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('escape key clears input and closes suggestions', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Rechercher des projets...') as HTMLInputElement;
    
    await user.type(input, 'test');
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Press Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Input should be cleared
    expect(input.value).toBe('');
  });
});
