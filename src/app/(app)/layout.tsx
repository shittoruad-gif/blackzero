import Sidebar from '@/components/Sidebar';
import UserMenu from '@/components/UserMenu';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          marginLeft: 'var(--sidebar-width)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '10px 24px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            minHeight: 48,
          }}
        >
          <UserMenu />
        </header>
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
