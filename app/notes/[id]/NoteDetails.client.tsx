'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: Boolean(id),
  });

  if (isLoading) {
    return <p className={css.container}>Loading note...</p>;
  }

  if (isError || !note) {
    return <p className={css.container}>Failed to load note.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2 className={css.title}>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created At: {note.createdAt}</p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
