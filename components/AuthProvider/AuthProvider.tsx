"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    let active = true;
    void checkSession()
      .then(async ({ success }) => {
        if (!active) return;
        if (!success) {
          clearIsAuthenticated();
          return;
        }
        try {
          const user = await getMe();
          if (active) setUser(user);
        } catch {
          if (active) clearIsAuthenticated();
        }
      })
      .catch(() => {
        if (active) clearIsAuthenticated();
      });
    return () => {
      active = false;
    };
  }, [clearIsAuthenticated, setUser]);

  return children;
}
