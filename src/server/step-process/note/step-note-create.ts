"use server";

import { createNote, CreateNoteRequest } from "@/api/note/create";

export const stepNoteCreate = async (params: CreateNoteRequest) => {
  return createNote(params);
};
