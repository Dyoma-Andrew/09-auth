import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const ogImage = {
  url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
  width: 1200,
  height: 630,
  alt: "NoteHub notes app",
};

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create and save a new note in NoteHub.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create and save a new note in NoteHub.",
    url: "https://notehub.com/notes/action/create",
    images: [ogImage],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
