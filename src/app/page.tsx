"use client"
import { useEffect, useState } from "react";

import { useToast } from "@shared/components/ui/use-toast";

import SubscribeBottomBar from "@main/components/SubscribeBottomBar";
import { SUBSCRIBE_TITLES} from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";

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


  return (
    <main className="flex w-full h-[100vh] flex-col items-center">
      <div className="flex h-full">
        <div>Main</div>
      </div>
      <SubscribeBottomBar />
    </main>

  );
}
