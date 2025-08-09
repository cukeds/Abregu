"use client";
import { useRouter } from "next/navigation";
import { saveAuth } from "@/lib/store";
import { useState } from "react";
import { btn, btnGhost, input, colors } from "@/lib/theme";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();

  const continueFlow = () => {
    saveAuth({ user: { name: "Demo" }, loggedIn: true });
    router.push("/agradecimiento");
  };

  const tabStyle = (active: boolean) => ({
    ...btnGhost,
    background: active ? colors.primary : colors.accent,
    color: active ? colors.accent : colors.primary,
    borderColor: colors.primary,
    flex: 1
  });

  return (
    <main style={{ padding: 20 }}>
      <h2
        style={{
          fontSize: 24,
          marginBottom: 16,
          color: colors.primary
        }}
      >
        {mode === "login" ? "Ingresar" : "Registrarse"}
      </h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {/* highlight active tab */}
        <button onClick={() => setMode("login")} style={tabStyle(mode === "login")}>
          Login
        </button>
        <button onClick={() => setMode("register")} style={tabStyle(mode === "register")}>
          Registro
        </button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <input placeholder="Email" style={input} />
        <input placeholder="Contraseña" type="password" style={input} />
        {/* disabled Google button uses base btn style, semi‑transparent */}
        <button disabled style={{ ...btn, opacity: 0.6 }}>
          Continuar con Google (no activo)
        </button>
        <button onClick={continueFlow} style={btn}>
          Continuar
        </button>
      </div>
    </main>
  );
}
