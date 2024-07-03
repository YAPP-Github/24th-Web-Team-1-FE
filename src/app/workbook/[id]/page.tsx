"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import SubscribePopup from "src/shared/components/ExternalControlOpenDialog";

import TitleSection from "@shared/components/TitleSection";

import CurriculumSection from "@workbook/components/CurriculumSection";
import OverviewSection from "@workbook/components/OverviewSection";
import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import WriterInfo from "@workbook/components/WriterInfo";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

import SubscribeBottomBar from "@subscription/components/SubscribeBottomBar";
import SubscribeForm from "@subscription/components/SubscribeForm";
import { SUBSCRIBE_TITLES } from "@subscription/constants/subscribe";
import { Mixpanel } from "@shared/utils/mixpanel";
import { EVENT_NAME } from "@shared/constants/mixpanel";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="h3-bold text-lg text-black">
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function WorkbookPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const {
    data: workbookInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getWorkbookQueryOptions(workbookId),
  });

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  Mixpanel.track({
    name: EVENT_NAME.WORKBOOK_APPEAR,
    property: { id: workbookId },
  });

  if (isLoading) return <WorkbookSkeleton />;
  // if (isError) return <div>Error loading workbook</div>;

  return (
    <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
        {isClient && (
          <SubscribePopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={SUBSCRIBE_POPUP_TITLE}
            content={<SubscribeForm setIsOpen={setIsOpen} />}
          />
        )}
        {workbookInfo && (
          <>
            <figure>
              <Image
                src={workbookInfo.mainImageUrl}
                alt={"Workbook landing image"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </figure>
            <TitleSection
              tagTexts={[workbookInfo.category]}
              title={workbookInfo.title}
              editorComponent={<WriterInfo writers={workbookInfo.writers} />}
              className={"px-[20px]"}
            />
            <OverviewSection overview={workbookInfo.description} />
            <CurriculumSection curriculumItems={workbookInfo.articles} />
            <SubscribeBottomBar />
          </>
        )}
      </article>
    </main>
  );
}
