"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { colors } from "@/lib/theme";

export default function Landing() {
  const router = useRouter();
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40) router.push("/auth");
    startX.current = null;
  };

  return (
    <main
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        padding: 24,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.primary,
        color: colors.accent
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8, color: colors.accent }}>
          Tu camino empieza hoy
        </h1>
        <p style={{ color: colors.secondary, marginBottom: 24 }}>
          "La constancia convierte metas en logros. Un día a la vez."
        </p>
        <p style={{ color: colors.accent, fontSize: 12 }}>
          Desliza → para continuar
        </p>
      </div>
    </main>
  );
}
