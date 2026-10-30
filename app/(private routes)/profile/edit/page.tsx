"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>Loading profile...</div>
      </main>
    );
  }

  return <EditProfileForm user={user} />;
}

function EditProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const updated = await updateMe({ username: username.trim() });
      setUser(updated);
      router.replace("/profile");
      router.refresh();
    } catch {
      setError("Could not update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <p>Email: {user.email}</p>
          {error && <p role="alert">{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
