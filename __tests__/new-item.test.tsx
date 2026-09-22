/**
 * Example test for the New Item screen.
 *
 * Key patterns demonstrated:
 *  1. Mock @/lib/supabase so no real DB calls happen.
 *  2. Mock @/hooks/use-auth to supply a fake session.
 *  3. Use RNTL to interact with the component and assert on rendered output.
 *
 * Imports come first in source order; Babel hoists jest.mock() calls before
 * any imports at runtime, so the component always receives the mocked modules.
 */

import NewItemScreen from '@/app/(app)/items/new';
import { supabase } from '@/lib/supabase';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: { id: 'user-123' },
    session: { access_token: 'mock-token' },
  }),
}));

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack, push: jest.fn(), replace: jest.fn() }),
}));

const mockFrom = jest.mocked(supabase.from);

describe('NewItemScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title input and save button', () => {
    render(<NewItemScreen />);
    expect(screen.getByPlaceholderText('Enter a title…')).toBeTruthy();
    expect(screen.getByText('Save Item')).toBeTruthy();
  });

  it('calls supabase insert and navigates back on submit', async () => {
    render(<NewItemScreen />);
    const input = screen.getByPlaceholderText('Enter a title…');

    fireEvent.changeText(input, 'My test item');
    fireEvent.press(screen.getByText('Save Item'));

    await waitFor(() => {
      expect(mockFrom).toHaveBeenCalledWith('items');
      expect(mockBack).toHaveBeenCalled();
    });
  });

  it('does not submit when the title is empty', async () => {
    render(<NewItemScreen />);
    fireEvent.press(screen.getByText('Save Item'));

    await waitFor(() => {
      expect(mockFrom).not.toHaveBeenCalled();
    });
  });
});
