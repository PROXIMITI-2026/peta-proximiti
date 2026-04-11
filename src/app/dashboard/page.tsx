'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardHomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard/map');
  }, [router]);

  return null;
}
