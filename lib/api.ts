import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteResponse {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubAPI = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}) => {
  const response: { data: FetchNotesResponse } = await noteHubAPI.get<FetchNotesResponse>(
    '/notes',
    {
      params: {
        page,
        perPage,
        ...(search ? { search } : {}),
        ...(tag && tag !== 'all' ? { tag } : {}),
      },
    }
  );
  return response.data;
};

export const createNote = async (note: CreateNoteRequest) => {
  const response: { data: CreateNoteResponse } = await noteHubAPI.post<CreateNoteResponse>(
    '/notes',
    note
  );
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response: { data: DeleteNoteResponse } = await noteHubAPI.delete<DeleteNoteResponse>(
    `/notes/${id}`
  );
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response: { data: Note } = await noteHubAPI.get<Note>(`/notes/${id}`);
  return response.data;
};
