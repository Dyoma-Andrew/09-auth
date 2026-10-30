import api from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}
export interface Credentials {
  email: string;
  password: string;
}

export async function fetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}) {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
}
export async function fetchNoteById(id: string) {
  return (await api.get<Note>(`/notes/${id}`)).data;
}
export async function createNote(note: CreateNoteRequest) {
  return (await api.post<Note>("/notes", note)).data;
}
export async function deleteNote(id: string) {
  return (await api.delete<Note>(`/notes/${id}`)).data;
}
export async function register(credentials: Credentials) {
  return (await api.post<User>("/auth/register", credentials)).data;
}
export async function login(credentials: Credentials) {
  return (await api.post<User>("/auth/login", credentials)).data;
}
export async function logout() {
  return (await api.post("/auth/logout")).data;
}
export async function checkSession() {
  return (await api.get<{ success: boolean }>("/auth/session")).data;
}
export async function getMe() {
  return (await api.get<User>("/users/me")).data;
}
export async function updateMe(data: Partial<Pick<User, "username">>) {
  return (await api.patch<User>("/users/me", data)).data;
}
