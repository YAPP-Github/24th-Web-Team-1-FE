import ArticleCardsWrapper from "@main/components/ArticleCardsWrapper";
import MainHeader from "@main/components/MainHeader";
import WorkbookCardsWrapper from "@main/components/WorkbookCardsWrapper";

export default function MainPage() {
  return (
    <main className="flex h-auto w-full flex-col">
      <MainHeader />
      <WorkbookCardsWrapper />
      <ArticleCardsWrapper />
    </main>
  );
}
