'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/app/notes/[id]/NoteDetails.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: note, isPending, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isPending && <p className={css.container}>Loading note...</p>}
      {isError && <p className={css.container} role="alert">Failed to load note.</p>}
      {note && <main className={css.main}><div className={css.container}><article className={css.item}>
        <header className={css.header}><h2>{note.title}</h2></header>
        <p className={css.tag}>{note.tag}</p><p className={css.content}>{note.content}</p>
        <p className={css.date}>Created At: {note.createdAt}</p>
      </article></div></main>}
    </Modal>
  );
}
