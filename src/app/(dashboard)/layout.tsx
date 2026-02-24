'use client';

import Button from '@/components/button/button';
import Sidebar from '@/components/sidebar';
import { clearTokens } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const router = useRouter();

  function handleLogout() {
    clearTokens();
    router.push('/login');
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-10 py-3">
        <section className="flex justify-end py-3">
          <Button variant="secondary" size="large" onClick={handleLogout}>
            로그아웃
          </Button>
        </section>
        {children}
      </main>
      {modal}
    </div>
  );
}
