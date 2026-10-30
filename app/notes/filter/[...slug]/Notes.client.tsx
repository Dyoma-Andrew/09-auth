'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from './Notes.module.css';

const PER_PAGE = 12;

export default function NotesClient({ tag }: { tag: string }) {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setPage(1);
  }, 500);

  const { data, isPending, isError } = useQuery({
    queryKey: ['notes', page, PER_PAGE, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  // const handleCreateNote = async (note: CreateNoteRequest) => {
  //   try {
  //     await createMutation.mutateAsync(note);
  //   } catch {}
  // };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}

        <Link className={css.button} href="/notes/action/create">Create note +</Link>
      </header>

      {isPending && <p>Loading notes...</p>}

      {isError && <p role="alert">Failed to load notes. Please try again.</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length === 0 && <p>No notes found.</p>}

    </div>
  );
}
