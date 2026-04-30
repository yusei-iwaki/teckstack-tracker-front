"use server";

import { deleteNote, DeleteNoteRequest } from "@/api/note/delete";

export const stepNoteDelete = async (params: DeleteNoteRequest) => {
  return deleteNote(params);
};
