"use client"
import { useEffect, useState } from "react";

import { useToast } from "@shared/components/ui/use-toast";

import SubscribeBottomBar from "@main/components/SubscribeBottomBar";
import { SUBSCRIBE_TITLES } from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
import Image from "next/image";
import TitleSection from "@workbook/components/TitleSection";
import OverviewSection from "@workbook/components/OverviewSection";
import CurriculumSection from "@workbook/components/CurriculumSection";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black h3-bold text-lg">
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
  </div>
);

export default function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const { form, onSubmit } = useSubscribeForm();

  const { toast } = useToast()

  useEffect(function detectClient() {
    setIsClient(true);
  }, []);

  // TBD: msw 로 변경
  const jsonArray = [];

  for (let i = 1; i <= 21; i++) {
    jsonArray.push({
      id: i,
      title: `Title ${i}`
    });
  }

  console.log(JSON.stringify(jsonArray, null, 2));


  return (
    <main className="flex w-full h-[100vh] flex-col items-center">
      <div className="flex flex-col h-full space-y-[24px] overflow-y-scroll px-[20px]">
        <Image
          src={"/main_img.png"}
          alt={"Workbook landing image"}
          width={480}
          height={0}
          style={{ maxWidth: '480px', height: 'auto' }}
        />
        <TitleSection category={"경제"} title={"재태크, 투자 필수 용어 모음집"} editors={["안나포", "퓨퓨", "프레소"]} />
        <OverviewSection overview={"사회 초년생부터, 직장인, 은퇴자까지 모두가 알아야 할 기본적인 재태크, 투자 필수 용어 모음집 입니다."} />
        <CurriculumSection curriculumItems={jsonArray} />
      </div>
      <SubscribeBottomBar />
    </main>

  );
}
