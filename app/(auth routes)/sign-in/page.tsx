"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const user = await login({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      setUser(user);
      router.replace("/profile");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            autoComplete="email"
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            autoComplete="current-password"
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
