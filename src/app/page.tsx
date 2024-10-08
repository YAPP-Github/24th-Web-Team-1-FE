import { Separator } from "@shared/components/ui/separator";

import ArticleCardsWrapper from "@main/components/ArticleCardsWrapper";
import MainHeader from "@main/components/MainHeader";
import WorkbookCardsWrapper from "@main/components/Workbook/WorkbookCardsWrapper";

import TopButton from "@common/components/TopButton";

export default function MainPage() {
  return (
    <main className="relative flex h-auto w-full flex-col overflow-y-auto">
      <MainHeader />
      <WorkbookCardsWrapper />
      <Separator className="h-[20px] bg-background1" />
      <ArticleCardsWrapper />
      <TopButton />
    </main>
  );
}
