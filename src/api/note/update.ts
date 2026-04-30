import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export type UpdateNoteRequest = {
  id: number;
  title: string;
  content: string;
};

export const updateNote = async ({
  id,
  title,
  content,
}: UpdateNoteRequest): Promise<void> => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${API_ROUTES.NOTE.UPDATE(id)}`, {
    method: "PUT",
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error();
};
