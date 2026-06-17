/**
 * SearchBar Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/features/SearchBar';

// Mock the searchService
jest.mock('@/services/searchService', () => ({
  searchService: {
    getAutocompleteSuggestions: jest.fn().mockResolvedValue([
      {
        type: 'project',
        label: 'pytest',
        value: 'pytest',
        description: 'Testing framework for Python',
      },
      {
        type: 'category',
        label: 'Testing',
        value: 'testing',
        description: 'Test frameworks and tools',
      },
    ]),
  },
}));

describe('SearchBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should render search input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');
    expect(input).toBeInTheDocument();
  });

  test('should show keyboard shortcut hint when empty', () => {
    render(<SearchBar />);
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  test('should focus input on Cmd+K shortcut', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    fireEvent.keyDown(window, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  test('should focus input on Ctrl+K shortcut', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  test('should clear search when clicking clear button', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...') as HTMLInputElement;

    await user.type(input, 'test');
    expect(input.value).toBe('test');

    const clearButton = screen.getByLabelText('Effacer la recherche');
    await user.click(clearButton);

    expect(input.value).toBe('');
  });

  test('should have proper ARIA attributes', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    expect(input).toHaveAttribute('aria-label', 'Recherche globale');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls', 'search-listbox');
  });

  test('should handle Escape key to clear input', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input).toHaveValue('');
  });

  test('should display suggestions when typing', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    await user.type(input, 'test');

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Check that suggestions are displayed
    expect(screen.getByText('pytest')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  test('should handle keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    // Type a search term
    await user.type(input, 'test');

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Press down arrow to select first suggestion
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    // Check if first item is selected
    const items = screen.getAllByRole('option');
    expect(items.length).toBeGreaterThan(0);
  });

  test('should close suggestions when clicking outside', async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher des projets...');

    await user.type(input, 'test');

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Click outside the search bar
    fireEvent.mouseDown(document.body);

    // Suggestions should be hidden
    await waitFor(() => {
      const listbox = screen.queryByRole('listbox');
      expect(listbox).not.toBeInTheDocument();
    });
  });
});

