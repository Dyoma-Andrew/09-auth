import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

const ogImage = { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', width: 1200, height: 630, alt: 'NoteHub notes app' };

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] ?? 'all';
  const label = filter === 'all' ? 'All notes' : `${filter[0].toUpperCase()}${filter.slice(1)} notes`;
  const description = filter === 'all' ? 'Browse all your notes in NoteHub.' : `Browse your ${filter} notes in NoteHub.`;
  return { title: `${label} | NoteHub`, description, openGraph: { title: `${label} | NoteHub`, description, url: `https://notehub.com/notes/filter/${slug.join('/')}`, images: [ogImage] } };
}

const PER_PAGE = 12;

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug[0] ?? 'all';
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, PER_PAGE, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, tag }),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}><NotesClient tag={tag} /></HydrationBoundary>;
}
