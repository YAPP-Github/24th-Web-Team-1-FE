import ArticleCardsWrapper from "@main/components/ArticleCardsWrapper";
import MainHeader from "@main/components/MainHeader";
import WorkbookCardsWrapper from "@main/components/WorkbookCardsWrapper";
import { Separator } from "@shared/components/ui/separator";

export default function MainPage() {
  return (
    <main className="flex h-auto w-full flex-col">
      <MainHeader />
      <WorkbookCardsWrapper />
      <Separator className="h-[20px] bg-background1" />
      <ArticleCardsWrapper />
    </main>
  );
}
