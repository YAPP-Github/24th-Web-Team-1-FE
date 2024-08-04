"use client";

import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import WriterInfo from "@workbook/components/WriterInfo";
import dynamic from "next/dynamic";

import { EVENT_NAME } from "@shared/constants/mixpanel";
import { Mixpanel } from "@shared/utils/mixpanel";
import { useEffect } from "react";

const TitleSection = dynamic(() => import("@shared/components/TitleSection"), {
  loading: () => <WorkbookSkeleton.TitleSkeleton />,
});
const OverviewSection = dynamic(
  () => import("@workbook/components/OverviewSection"),
  {
    loading: () => <WorkbookSkeleton.OverviewSectionSkeleton />,
  },
);
const CurriculumSection = dynamic(
  () => import("@workbook/components/CurriculumSection"),
  {
    loading: () => <WorkbookSkeleton.ContentWrapperkeleton />,
  },
);
const WorkbookMainImage = dynamic(
  () => import("@workbook/components/WorkBookMainImage"),
  {
    loading: () => <WorkbookSkeleton.ImageSkeleton />,
  },
);

const SubscribeBottomBar = dynamic(
  () => import("@subscription/components/SubscribeBottomBar"),
  {
    loading: () => <></>,
  },
);

export default function WorkbookPage() {
  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const { data: workbookInfo, isLoading } = useQuery({
    ...getWorkbookQueryOptions(workbookId),
  });

  // useEffect(
  //   function trackMixpanel() {
  //     Mixpanel.track({
  //       name: EVENT_NAME.WORKBOOK_APPEAR,
  //       property: { id: workbookId },
  //     });
  //   },
  //   [pathname],
  // );

  if (isLoading) {
    return (
      <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
        <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
          <WorkbookSkeleton.ImageSkeleton />
          <WorkbookSkeleton.TitleSkeleton />
          <WorkbookSkeleton.OverviewSectionSkeleton />
          <WorkbookSkeleton.ContentWrapperkeleton />
        </article>
      </main>
    );
  }

  return (
    <>
      <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
        <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
          {workbookInfo && (
            <>
              <WorkbookMainImage mainImageUrl={workbookInfo.mainImageUrl} />
              <TitleSection
                tagTexts={[workbookInfo.category]}
                title={workbookInfo.title}
                editorComponent={<WriterInfo writers={workbookInfo.writers} />}
                className={"px-[20px]"}
              />

              <OverviewSection overview={workbookInfo.description} />
              <CurriculumSection curriculumItems={workbookInfo.articles} />
              {/* <SubscribeBottomBar /> */}
            </>
          )}
        </article>
      </main>
    </>
  );
}
