"use client";
import { CategoryInfo } from "@common/types/category";
import { getWorkbookCategoryQueryOptions } from "@main/remotes/getWorkbookCategoryQueryOptions";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@shared/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { HTMLAttributes, useEffect } from "react";
interface CategoryTabsProps extends HTMLAttributes<HTMLDivElement> {
  type: "WORKBOOK" | "ARTICLE";
  category: CategoryInfo | undefined;
  handleCategory: (category: CategoryInfo) => void;
}
export default function CategoryTabs({
  type,
  category,
  handleCategory,
  className,
}: CategoryTabsProps) {
  const {
    data: categoryList,
    refetch,
    isLoading,
  } = useQuery({
    ...getWorkbookCategoryQueryOptions(),
    enabled: type !== "ARTICLE",
  });
  // MEMO : msw에서 모킹을 처음에 실패해서 일부러 넣은코드..! 실서버 연결시에는 삭제필요
  useEffect(() => {
    setTimeout(() => refetch(), 3000);
  }, []);

  useEffect(
    function setInitCategory() {
      if (categoryList) handleCategory(categoryList[0].name);

    },
    [categoryList],
  );

  if (isLoading) return <></>;

  if (categoryList && category)
    return (

      <Tabs defaultValue={categoryList[0].name} className="overflow-x-auto">
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
              onClick={() => handleCategory({ code, name })}
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
