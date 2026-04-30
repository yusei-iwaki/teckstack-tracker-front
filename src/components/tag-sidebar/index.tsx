"use client";

import { Tag } from "@/types/tag";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  initialTags: Array<Tag>;
  onClose?: () => void;
};

export default function TagSidebar({ initialTags, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  return (
    <div className="bg-white p-4 rounded-xl shadow h-fit">
      <h2 className="font-bold mb-3 text-sm text-gray-600">タグ</h2>

      <div className="space-y-2">
        {initialTags.map((tag) => (
          <div
            key={tag.name}
            onClick={() => {
              router.push(`/member/dashboard?tag=${tag.name}`, {
                scroll: false,
              });
              onClose?.();
            }}
            className={`
              flex justify-between px-3 py-2 rounded cursor-pointer text-sm
              hover:bg-gray-100
              ${currentTag === tag.name ? "bg-blue-100 text-blue-600" : ""}
            `}
          >
            <span>#{tag.name}</span>
            <span className="text-xs text-gray-400">{tag.count}</span>
          </div>
        ))}
      </div>

      {currentTag && (
        <button
          onClick={() => {
            router.push("/member/dashboard");
            onClose?.();
          }}
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          クリア
        </button>
      )}
    </div>
  );
}
