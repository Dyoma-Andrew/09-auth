import css from './not-found.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'The NoteHub page you are looking for could not be found.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'The NoteHub page you are looking for could not be found.',
    url: 'https://notehub.com/',
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', width: 1200, height: 630, alt: 'NoteHub notes app' }],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
