import { createClient } from '@/app/_modules/supabase/server';
import SchoolProviderWrapper from '@/app/_modules/providers/school-provider-wrapper';
import Providers from "@/app/_modules/providers/providers";

export default async function SchoolLayout({ children }: { children: React.ReactNode }) {

  const supabase = await createClient('university');

  const schoolId = process.env.SCHOOL_ID;

  const [{ data: school }] = await Promise.all([
    supabase.from('schools').select('*').eq('id', schoolId).single(),
  ]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main role="main" className='flex justify-center items-start flex-1 p-5 md:px-10 md:pb-0'>
        <SchoolProviderWrapper school={school}>
          <Providers>{children}</Providers>
        </SchoolProviderWrapper>
      </main>
    </div>
  );
}
