"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import SubscribePopup from "src/common/components/ExternalControlOpenDialog";

import { Button } from "@shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { useToast } from "@shared/components/ui/use-toast";

import CurriculumSection from "@workbook/components/CurriculumSection";
import OverviewSection from "@workbook/components/OverviewSection";
import TitleSection from "@workbook/components/TitleSection";
import WorkbookSkeleton from "@workbook/components/WorkbookSkeleton";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import { getWorkbookId } from "@workbook/utils";

import SubscribeBottomBar from "@main/components/SubscribeBottomBar";
import { EMAIL_CONTROL, SUBSCRIBE_ANNOUCE, SUBSCRIBE_TITLES, SUBSCRIBE_USER_ACTIONS } from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
// import { SUBSCRIBE_TITLES } from "@main/constants/main";

/** 팝업 들어오면 주석 풀 예정 */
const SUBSCRIBE_POPUP_TITLE = (
  <div className="h3-bold text-lg text-black">
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function WorkbookPage() {
  /** 팝업 추가 시 다시 살릴 변수들 */
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const { form, onSubmit } = useSubscribeForm();

  const [isClient, setIsClient] = useState<boolean>(false);

  // usePathname 로 workbook id 받기
  const pathname = usePathname();
  const workbookId = getWorkbookId(pathname);

  const {
    data: workbookInfo,
    isLoading,
    isError,
  } = useQuery({
    ...getWorkbookQueryOptions(Number(workbookId)),
  });

  const { toast } = useToast();

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  if (isLoading) return <WorkbookSkeleton />;
  if (isError) return <div>Error loading workbook</div>;

  return (
    <main className="flex h-[100vh] w-full flex-col items-center overflow-x-hidden">
      <article className="flex h-full w-full max-w-screen-sm flex-col space-y-[24px] overflow-y-scroll">
        {isClient && (
          <SubscribePopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={SUBSCRIBE_POPUP_TITLE}
            content={
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={EMAIL_CONTROL.EMAIL_PLACEHOLDER}
                            {...field}
                            className={`rounded-[10px] text-[16px] focus-visible:ring-transparent ${form.formState.errors.email ? "border-error" : ""}`}
                          />
                        </FormControl>
                        <FormMessage />
                        <span className="mt-[11px] text-[12px] font-semibold text-text-gray2">
                          {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE}{" "}
                          <a className="text-[12px] font-semibold underline">
                            {SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}
                          </a>
                          과{" "}
                          <a className="text-[12px] font-semibold underline">
                            {SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}
                          </a>
                          에 {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
                        </span>
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full flex-row space-x-[8px]">
                    <Button
                      onClick={() => setIsOpen(false)}
                      type="button"
                      variant={"outline"}
                      className={"w-1/2 rounded-none bg-white text-[14px] font-medium text-black"}
                    >
                      {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_REJECT}
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      type="submit"
                      variant={"outline"}
                      className={"w-1/2 rounded-none bg-black text-[14px] font-medium text-white"}
                    >
                      {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_ACCEPT}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            }
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
                style={{ width: "100%", height: "338px" }}
              />
            </figure>
            <TitleSection
              category={workbookInfo.category}
              title={workbookInfo.title}
              editors={workbookInfo.writerIds}
            />
            <OverviewSection overview={workbookInfo.description} />
            <CurriculumSection curriculumItems={workbookInfo.articles} />
          </>
        )}
      </article>
      <SubscribeBottomBar />
    </main>
  );
}
