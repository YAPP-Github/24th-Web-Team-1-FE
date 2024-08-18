"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import useIsWebpBrowser from "@shared/hooks/useIsWebpBrowser";
import WorkbookButton from "@workbook/components/WorkbookButton";
import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import WriterInfo from "@workbook/components/WriterInfo";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

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

export default function WorkbookPage() {
  const { isWebpBrowser } = useIsWebpBrowser();
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);
  // useTrackMixpanel({
  //   eventKey: EVENT_NAME.WORKBOOK_APPEAR,
  //   property: { id: workbookId },
  //   dep: pathname,
  // });

  const { data: workbookInfo, isLoading } = useQuery({
    ...getWorkbookQueryOptions({ workbookId, isWebpBrowser }),
  });

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
      <main className="flex w-full flex-col items-center overflow-x-hidden">
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
              <WorkbookButton />
            </>
          )}
        </article>
      </main>
    </>
  );
}
