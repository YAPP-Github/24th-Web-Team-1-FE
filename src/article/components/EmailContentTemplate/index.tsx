"use client";

import { ARTICLE_INFO_TYPE } from "@article/constants/articleCase";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";
import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import { useQueries } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import ArticleSkeleton from "../ArticleSkeleton";

export default function EmailContentTemplate() {
  const { articleId } = useParams<{ articleId: string }>();

  const params = useSearchParams();
  const workbookId = params.get("workbookId");

  const results = useQueries({
    queries: [
      {
        ...getArticleQueryOptions({ articleId }),
        enabled: !workbookId,
        // staleTime: 1000,
      },
      {
        ...getArticleWithWorkbookQueryOptions({
          workbookId,
          articleId,
        }),
        enabled: Boolean(workbookId),
        // staleTime: 1000,
      },
    ],
  });
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = workbookId
    ? results[ARTICLE_INFO_TYPE.ARTICLE_WITH_WORKBOOK]
    : results[ARTICLE_INFO_TYPE.ONLY_ARTICLE];

  if (isLoading || isError || !articleInfo)
    return <ArticleSkeleton.EmailContentTemplateSkeleton />;

  const { content } = articleInfo;

  return (
    <table>
      <tbody>
        <tr style={{}}>
          <td dangerouslySetInnerHTML={{ __html: content }}></td>
        </tr>
      </tbody>
    </table>
  );
}
