"use client";
import { CategoryClientInfo } from "@common/types/category";
import { getArticleCategoryQueryOptions } from "@main/remotes/getArticleCategoryQueryOptions";
import { getWorkbookCategoryQueryOptions } from "@main/remotes/getWorkbookCategoryQueryOptions";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@shared/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { HTMLAttributes, useEffect } from "react";
import CategoryTabSkeleton from "../CategoryTabSkeleton";
import { Mixpanel } from "@shared/utils/mixpanel";
import { EVENT_NAME } from "@shared/constants/mixpanel";
interface CategoryTabsProps extends HTMLAttributes<HTMLDivElement> {
  type: "WORKBOOK" | "ARTICLE";
  category: CategoryClientInfo | undefined;
  handleCategory: (category: CategoryClientInfo) => void;
}
export default function CategoryTabs({
  type,
  category,
  handleCategory,
  className,
}: CategoryTabsProps) {
  const { data: workbookCategoryList, isLoading: isWorkbookCategoryLoading } =
    useQuery({
      ...getWorkbookCategoryQueryOptions(),
      enabled: type !== "WORKBOOK",
    });
  const { data: articleCategoryList, isLoading: isArticleCategoryLoading } =
    useQuery({
      ...getArticleCategoryQueryOptions(),
      enabled: type !== "ARTICLE",
    });
  useEffect(
    function setInitCategory() {
      if (workbookCategoryList && type === "WORKBOOK")
        handleCategory(workbookCategoryList[0]);
      if (articleCategoryList && type === "ARTICLE")
        handleCategory(articleCategoryList[0]);
    },
    [workbookCategoryList, articleCategoryList],
  );
  const categoryList =
    type === "WORKBOOK" ? workbookCategoryList : articleCategoryList;
  const isLoading =
    type === "WORKBOOK" ? isWorkbookCategoryLoading : isArticleCategoryLoading;

  const onClickCategory = ({ code, name }: CategoryClientInfo) => {
    handleCategory({ code, name });
    Mixpanel.track({
      name:
        type === "ARTICLE"
          ? EVENT_NAME.MAIN_ARTICLECATEGORY_TAPPED
          : EVENT_NAME.MAIN_WORKBOOK_SHORTCUT_TAPPED,
      property: { category: name },
    });
  };
  if (isLoading || !categoryList)
    return <CategoryTabSkeleton className={className} />;

  if (categoryList && category !== undefined)
    return (
      <Tabs
        defaultValue={categoryList[0].name}
        className={cn("overflow-x-auto", className)}
      >
        <TabsList className="sub2-bold flex gap-3 py-[10px]">
          {categoryList.map(({ name, code }) => (
            <TabsTrigger
              key={`${code}-${type}`}
              value={name}
              className={cn(
                category.code !== code && "text-text-gray2",
                "box-border flex flex-col gap-[10px] pt-[10px]",
                "min-w-[48px]",
              )}
              name={name}
              onClick={() => onClickCategory({ code, name })}
            >
              <span className="flex w-full items-center justify-center">
                {name}
              </span>
              {category.code === code && (
                <span className="w-full border-b-2 border-black"></span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
}
