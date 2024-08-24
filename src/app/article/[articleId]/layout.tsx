import { ReactNode } from "react";

import ArticleBottomButton from "@article/components/ArticleBottomButton/indext";

import TopBar from "@shared/components/TopBar";

interface ArticlePageLayoutProps {
  children: ReactNode;
}
export default function ArticlePageLayout({
  children,
}: ArticlePageLayoutProps) {
  return (
    <main className="flex h-auto w-full">
      <section className="flex h-auto w-full flex-col justify-between">
        <TopBar className="px-[20px]" />
        <div className="mx-[20px] mb-[10px] flex flex-col">{children}</div>
        <ArticleBottomButton title={"문제풀기"} />
      </section>
    </main>
  );
}
