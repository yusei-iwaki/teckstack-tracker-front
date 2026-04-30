import { API_ROUTES } from "@/constants/api-route";
import { cookies } from "next/headers";

export type CreateNoteRequest = {
  title: string;
  content: string;
  tags: string;
};

export const createNote = async ({
  title,
  content,
  tags,
}: CreateNoteRequest): Promise<void> => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${API_ROUTES.NOTE.CREATE}`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error();
};
