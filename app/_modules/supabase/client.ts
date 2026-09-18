import { createBrowserClient } from '@supabase/ssr';

export type SchoolType = 'university';

export function createSupabaseClient(type: SchoolType) {
  if (type !== 'university') {
    throw new Error('잘못된 학교 타입입니다.');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL_UNIVERSITY!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_UNIVERSITY!;

  return createBrowserClient(url, key, {
    cookieOptions: {
      name: 'university-auth',
    },
  });
}