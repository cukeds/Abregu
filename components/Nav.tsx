"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors } from '@/lib/theme';

/**
 * A bottom navigation bar for the mobile prototype.
 *
 * It highlights the current route and provides quick access to
 * the main sections of the app. To use this component, import it
 * into pages where you want persistent navigation and place it
 * below the primary content.
 */
export default function Nav() {
  const pathname = usePathname();
  const items = [
    { href: '/dashboard', label: 'Inicio', icon: '🏠' },
    { href: '/competencias', label: 'Comp', icon: '🏆' },
    { href: '/agenda', label: 'Agenda', icon: '🗓️' },
    { href: '/evaluaciones', label: 'Eval', icon: '🧠' }
  ];
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: `1px solid ${colors.primary}`,
        padding: '8px 0',
        background: colors.accent,
        position: 'sticky',
        bottom: 0
      }}
    >
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: active ? colors.primary : '#666',
              fontWeight: active ? 'bold' : 500,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}