import ArticleTitle from "@article/components/ArticleTitle";
import EmailContentTemplate from "@article/components/EmailContentTemplate";
import React from "react";

export default function ArticlePage() {
  return (
    <div className="flex h-full flex-col gap-[46px]">
      <ArticleTitle />
      <EmailContentTemplate />
    </div>
  );
}
