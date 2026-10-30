import css from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/">NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
