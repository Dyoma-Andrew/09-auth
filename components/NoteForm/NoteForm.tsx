'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote, type CreateNoteRequest } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState('');
  const { mutateAsync, isPending } = useMutation({ mutationFn: createNote });

  useEffect(() => {
    void Promise.resolve(useNoteStore.persist.rehydrate()).finally(() => setIsHydrated(true));
  }, []);

  async function formAction(formData: FormData) {
    setError('');
    const note: CreateNoteRequest = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? ''),
      tag: String(formData.get('tag') ?? 'Todo') as NoteTag,
    };

    try {
      await mutateAsync(note);
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    } catch {
      setError('Failed to create note. Please try again.');
    }
  }

  if (!isHydrated) return null;

  return (
    <form className={css.form} action={formAction}>
      {error && <p className={css.error} role="alert">{error}</p>}
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          minLength={3}
          maxLength={50}
          required
          defaultValue={draft.title}
          onChange={(event) => setDraft({ title: event.currentTarget.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(event) => setDraft({ content: event.currentTarget.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(event) => setDraft({ tag: event.currentTarget.value as NoteTag })}
        >
          {tags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
