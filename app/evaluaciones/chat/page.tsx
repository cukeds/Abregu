"use client";
import Header from '@/components/Header';
import { colors } from '@/lib/theme';

/**
 * Chat page for evaluations.  Displays a short, static conversation between
 * the psychologist and the user along with their avatars and names.  The
 * conversation is sized to avoid excessive whitespace on mobile screens, and
 * a disclaimer is shown directly below the messages rather than far down the page.
 */
export default function EvaluacionesChat() {
  const psico = { name: 'Psicóloga', avatar: '/avatars/psico.png' };
  const user = { name: 'Jugador', avatar: '/avatars/user.png' };
  const fakeThread = [
    { from: 'psico', text: '¿Cómo te sentiste antes de la competencia?' },
    { from: 'yo', text: 'Nervioso pero enfocado.' },
    { from: 'psico', text: 'Bien. Luego cargamos la evaluación cuando esté.' }
  ];
  const getMeta = (sender: string) => (sender === 'psico' ? psico : user);
  return (
    <>
      <Header title="Chat" />
      <main
        style={{
          padding: 20,
          minHeight: 'calc(100dvh - 48px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 12, color: colors.primary }}>Conversación</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {fakeThread.map((m, i) => {
            const meta = getMeta(m.from);
            const isUser = m.from === 'yo';
            return (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'flex-start', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
              >
                {!isUser && (
                  <img
                    src={meta.avatar}
                    alt={meta.name}
                    style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
                  />
                )}
                <div style={{ maxWidth: '70%' }}>
                  <div
                    style={{
                      fontSize: 12,
                      marginBottom: 2,
                      color: '#555',
                      textAlign: isUser ? 'right' : 'left'
                    }}
                  >
                    {meta.name}
                  </div>
                  <div
                    style={{
                      background: isUser ? colors.primary : colors.secondary,
                      color: isUser ? colors.accent : '#000',
                      padding: '8px 12px',
                      borderRadius: 12,
                      borderTopLeftRadius: isUser ? 12 : 0,
                      borderTopRightRadius: isUser ? 0 : 12,
                      textAlign: isUser ? 'right' : 'left'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
                {isUser && (
                  <img
                    src={meta.avatar}
                    alt={meta.name}
                    style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8 }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p style={{ color: '#888', fontSize: 12, marginTop: 12 }}>
          * Conversación de ejemplo, no interactiva.
        </p>
      </main>
    </>
  );
}