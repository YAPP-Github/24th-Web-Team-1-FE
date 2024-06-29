import { useRouter } from "next/navigation";

import React, { ReactNode } from "react";

import { useArticleInfo } from "@subscription/hooks/useArticleInfo";

import TopBar from "@common/components/TopBar";

interface UnsubscribeLayoutProps {
  children: ReactNode;
}
export default function UnsubscribeLayout({ children }: UnsubscribeLayoutProps) {
  const router = useRouter()

  const { articleId, workbookId } = useArticleInfo()

  const handleClickBack = () => {
    router.push(`/article/${articleId}?workbookId=${workbookId}`)
  }
  
  return (
    <section className="mx-[20px] mb-[10px] flex h-auto w-full flex-col justify-between">
      <TopBar onClick={handleClickBack} />
      {children}
    </section>
  );
}