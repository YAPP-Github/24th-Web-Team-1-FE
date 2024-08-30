"use client";

import { useQueries } from "@tanstack/react-query";

import ArticleSkeleton from "@article/components/ArticleSkeleton";
import { ARTICLE_INFO_TYPE } from "@article/constants/articleCase";
import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";

interface ProblemArticleTemplateProps {
    articleId: string
}

export default function ProblemArticleTemplate({ articleId }: ProblemArticleTemplateProps) {
  
  const results = useQueries({
    queries: [
      {
        ...getArticleQueryOptions({ articleId }),
        staleTime: Infinity,
      },
    ],
  });
  const {
    data: articleInfo,
    isLoading,
    isError,
  } = results[ARTICLE_INFO_TYPE.ONLY_ARTICLE];

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
