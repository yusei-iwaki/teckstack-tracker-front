import { API_ROUTES } from "@/constants/api-route";
import { PagedNote } from "@/types/note";
import { cookies } from "next/headers";

export type GetNotesRequest = {
  tag: string;
  page: string;
};

export const getNotes = async ({
  tag,
  page,
}: GetNotesRequest): Promise<PagedNote> => {
  const token = (await cookies()).get("token")?.value;

  const queryParams = new URLSearchParams();
  queryParams.append("tag", tag);
  queryParams.append("page", page);
  console.log(`${API_ROUTES.NOTE.LIST}?${queryParams.toString()}`);

  const res = await fetch(`${API_ROUTES.NOTE.LIST}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error();

  return await res.json();
};
