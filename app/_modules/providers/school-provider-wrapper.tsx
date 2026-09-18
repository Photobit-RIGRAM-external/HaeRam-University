'use client';

import { SchoolProvider } from './school-provider';

export default function SchoolProviderWrapper({school,children,}: { school: any; children: React.ReactNode;}) {
  return (
    <SchoolProvider school={school}>
      {children}
    </SchoolProvider>
  );
}