import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export type DeleteNoteRequest = {
  id: number;
};

export const deleteNote = async ({ id }: DeleteNoteRequest): Promise<void> => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${API_ROUTES.NOTE.DELETE(id)}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error();
};
