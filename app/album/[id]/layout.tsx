export default async function SchoolLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <main role="main" className='flex justify-center items-start flex-1 p-5 md:px-10 md:pb-0'>
        {children}
      </main>
    </div>
  );
}
