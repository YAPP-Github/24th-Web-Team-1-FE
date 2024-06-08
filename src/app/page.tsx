"use client"
import { useEffect, useState } from "react";

import SubscribePopup from "src/common/components/ExternalControlOpenDialog";
import { EMAIL_PLACEHOLDER, SUBSCRIBE_ACCEPT, SUBSCRIBE_ANNOUCE, SUBSCRIBE_REJECT, SUBSCRIBE_TITLE_1, SUBSCRIBE_TITLE_2 } from "@main/constants/main";
import { Input } from "@shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/components/ui/form"
import { useToast } from "@shared/components/ui/use-toast";
import { Button } from "@shared/components/ui/button";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
import SubscribeBottomBar from "@main/components/SubscribeBottomBar";

const SUBSCRIBE_POPUP_TITLE = (
  <div className="text-black h3-bold text-lg">
    <div>{SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLE_2}</div>
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
