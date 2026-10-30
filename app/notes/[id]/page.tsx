import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

const ogImage = { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', width: 1200, height: 630, alt: 'NoteHub notes app' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    const description = note.content.trim().slice(0, 160) || `Read the note “${note.title}” in NoteHub.`;
    return { title: `${note.title} | NoteHub`, description, openGraph: { title: `${note.title} | NoteHub`, description, url: `https://notehub.com/notes/${id}`, images: [ogImage] } };
  } catch {
    return { title: 'Note | NoteHub', description: 'View a note in NoteHub.', openGraph: { title: 'Note | NoteHub', description: 'View a note in NoteHub.', url: `https://notehub.com/notes/${id}`, images: [ogImage] } };
  }
}

export default NoteDetails;
