import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export type SchoolType = 'university';

export async function createClient(type: SchoolType = 'university') {
  const cookieStore = await cookies();

  if (type !== 'university') {
    throw new Error('잘못된 학교 타입입니다.');
  }

  const cookieName = 'university-auth';

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL_UNIVERSITY!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_UNIVERSITY!,
    {
      cookieOptions: {
        name: cookieName,
      },

      cookies: {
        getAll() {
          return cookieStore
            .getAll()
            .filter(({ name }) => {
              return (
                name === cookieName ||
                name.startsWith(`${cookieName}.`)
              );
            });
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              if (
                name === cookieName ||
                name.startsWith(`${cookieName}.`)
              ) {
                cookieStore.set(name, value, options);
              }
            });
          } catch {
            /**
             * Server Component에서는 cookie mutation이
             * 불가능할 수 있으므로 무시
             */
          }
        },
      },
    }
  );
}
