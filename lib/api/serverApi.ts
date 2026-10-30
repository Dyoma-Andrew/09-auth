import api from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

type NotesResponse = { notes: Note[]; totalPages: number };
const cookieConfig = (cookie: string) => ({ headers: { Cookie: cookie } });

export async function fetchNotes(
  params: { page: number; perPage: number; search?: string; tag?: string },
  cookie = "",
) {
  return (
    await api.get<NotesResponse>("/notes", { ...cookieConfig(cookie), params })
  ).data;
}
export async function fetchNoteById(id: string, cookie = "") {
  return (await api.get<Note>(`/notes/${id}`, cookieConfig(cookie))).data;
}
export async function getMe(cookie = "") {
  return (await api.get<User>("/users/me", cookieConfig(cookie))).data;
}
export async function checkSession(cookie = "") {
  return (
    await api.get<{ success: boolean }>("/auth/session", cookieConfig(cookie))
  ).data;
}
