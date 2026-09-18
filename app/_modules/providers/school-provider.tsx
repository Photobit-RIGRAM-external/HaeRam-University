'use client';

import { createContext, useContext } from 'react';

type School = {
  id: string;
  school_name: string;
  school_name_en: string;
  graduation_year: string;
  school_img_url: string;
  manager_name: string;
  manager_email: string;
  manager_contact: string;
  created_at: string;
  updated_at: string;
};

const SchoolContext = createContext<School | null>(null);

export function SchoolProvider({ school, children, }: { school: School; children: React.ReactNode;}) {
  return (
    <SchoolContext.Provider value={school}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);

  if (!context) {
    throw new Error('useSchool must be used inside SchoolProvider');
  }

  return context;
}