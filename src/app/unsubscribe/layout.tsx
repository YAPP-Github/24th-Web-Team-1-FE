"use client";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

import { useArticleInfo } from "@subscription/hooks/useArticleInfo";

import TopBar from "@shared/components/TopBar";

interface UnsubscribeLayoutProps {
  children: ReactNode;
}
export default function UnsubscribeLayout({
  children,
}: UnsubscribeLayoutProps) {
  const router = useRouter();

  const { articleId, workbookId } = useArticleInfo();

  const handleClickBack = () => {
    router.push(`/article/${articleId}?workbookId=${workbookId}`);
    return;
  };

  return (
    <section className="mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar onClick={handleClickBack} />
      {children}
    </section>
  );
}
