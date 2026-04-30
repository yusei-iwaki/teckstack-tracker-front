"use server";

import { updateNote, UpdateNoteRequest } from "@/api/note/update";

export const stepNoteUpdate = async (params: UpdateNoteRequest) => {
  return updateNote(params);
};
