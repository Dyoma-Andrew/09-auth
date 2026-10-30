import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";
import { cookies } from "next/headers";

export default async function NotePreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookie = (await cookies()).toString();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id, cookie),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
