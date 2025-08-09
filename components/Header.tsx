"use client";
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/theme';

interface HeaderProps {
  title: string;
  /** Show a back button on the left. Defaults to true. */
  showBack?: boolean;
  /** Show a home button on the right. Defaults to true. */
  showHome?: boolean;
}

/**
 * A simple top header with optional back and home buttons.
 * Use this on pages after login to give users a consistent way
 * to navigate. Do not include this on the landing or auth pages.
 */
export default function Header({ title, showBack = true, showHome = true }: HeaderProps) {
  const router = useRouter();
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderBottom: `1px solid ${colors.primary}`,
        background: colors.accent
      }}
    >
      <div style={{ width: 40 }}>
        {showBack && (
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: colors.primary,
              fontSize: 24,
              cursor: 'pointer'
            }}
            aria-label="Volver"
          >
            ←
          </button>
        )}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 18,
          color: colors.primary,
          flex: 1,
          textAlign: 'center'
        }}
      >
        {title}
      </h1>
      <div style={{ width: 40, textAlign: 'right' }}>
        {showHome && (
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: colors.primary,
              fontSize: 24,
              cursor: 'pointer'
            }}
            aria-label="Inicio"
          >
            🏠
          </button>
        )}
      </div>
    </header>
  );
}