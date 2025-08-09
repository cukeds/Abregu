"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Landing() {
  const router = useRouter();
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40) router.push("/auth"); // swipe left
    startX.current = null;
  };

  return (
    <main onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ padding: 20, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Tu camino empieza hoy</h1>
        <p style={{ color: '#555', marginBottom: 24 }}>
          "La constancia convierte metas en logros. Un día a la vez."
        </p>
        <p style={{ color: '#888' }}>Desliza ⟶ para continuar</p>
      </div>
    </main>
  );
}