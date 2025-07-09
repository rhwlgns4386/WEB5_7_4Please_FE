import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    const matches = useMatches();
    // 현재 라우트에서 헤더 숨김 여부 확인
    const hideHeader = matches.some(
      match => (match.staticData as any)?.hideHeader
    );

    return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='min-h-screen'>
          {!hideHeader && <Header />}
          <main className={!hideHeader ? 'pt-[64px]' : ''}>
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    );
  },
});
