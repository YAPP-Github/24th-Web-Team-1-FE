import React, { ReactNode } from "react";

import TopBar from "@common/components/TopBar";
import ArticleBottomButton from "@article/components/ArticleBottomButton/indext";

interface ArticlePageLayoutProps {
  children: ReactNode;
}
export default function ArticlePageLayout({
  children,
}: ArticlePageLayoutProps) {
  return (
    <main className="flex h-auto w-full flex-col">
      <section className="relative mx-[20px] mb-[10px] flex h-auto flex-col justify-between">
        <TopBar />
        {children}
      </section>
      <ArticleBottomButton title={"문제풀기"} />
    </main>
  );
}
