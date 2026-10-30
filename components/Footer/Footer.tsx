import css from './Footer.module.css';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {currentYear} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Doma Andrii</p>
          <p>
            Contact us:
            <Link href="mailto:student@notehub.app">student@notehub.app</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
