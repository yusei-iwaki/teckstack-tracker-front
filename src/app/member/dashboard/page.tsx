import { Suspense } from "react";
import Content from "./content";
import { getNotes } from "@/api/note/get";
import { getTags } from "@/api/tag/get";

type Props = {
  searchParams: {
    tag?: string;
    page?: string;
  };
};
export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const tag = params.tag ?? "";
  const page = params.page ?? "0";

  const notes = await getNotes({ tag, page });
  const tags = await getTags();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content initialNotes={notes} initialTags={tags} />
    </Suspense>
  );
}
