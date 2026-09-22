// Manual mock for @supabase/supabase-js.
// Tests that import from @/lib/supabase will use jest.mock('@/lib/supabase')
// instead (see example test), which is cleaner than mocking the library itself.
// This file exists as a reference pattern; add it to __mocks__/node_modules if
// you ever need to mock the library directly.

export const createClient = jest.fn(() => ({
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    }),
    signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
    signUp: jest.fn().mockResolvedValue({ error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));
