"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function NotesFilterError({ error, reset }: Props) {
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>Could not fetch the filtered notes. {error.message}</p>
      <button type="button" onClick={reset}>
        Спробувати знову
      </button>
    </div>
  );
}
