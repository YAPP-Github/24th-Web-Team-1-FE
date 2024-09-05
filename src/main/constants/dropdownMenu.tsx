import Link from "next/link";

import { Separator } from "@shared/components/ui/separator";

import SubscriptionEmailManagement from "@main/components/EmailManagementMenu";
import SubscriptionManagementList from "@main/components/SubscriptionManagementList";
import { DropdownMenuItem } from "@main/types/dropdownMenu";

import LogoutLink from "@auth/components/LogoutLink";
import FewLogo from "public/assets/icon/fewlogo.svg";

export const AUTH_LINK: DropdownMenuItem[] = [
  {
    title: "내 이메일",
    component: ({ title, email }: { title: string; email?: string }) => (
      <div className="flex flex-col gap-[15px]">
        <span>{title}</span>
        <div className="flex items-center gap-[9px]">
          <FewLogo
            width={32}
            height={32}
            className="rounded-full bg-main p-[3px]"
          />
          <span className="sub2-bold text-text-gray1">{email}</span>
        </div>
      </div>
    ),
  },
  {
    title: "회원탈퇴",
    component: ({ title }: { title: string }) => <LogoutLink title={title} />,
  },

  {
    title: "로그아웃",
    component: ({ title }: { title: string }) => <LogoutLink title={title} />,
  },
  {
    title: "FEW와 협업하려면",
    component: ({ title }: { title: string }) => (
      <Link href="https://tally.so/r/nP0OMQ" target="_blank">
        {title}
      </Link>
    ),
  },
  {
    title: "인스타그램",
    component: ({ title }: { title: string }) => (
      <Link href="https://www.instagram.com/few.letter" target="_blank">
        {title}
      </Link>
    ),
  },
  {
    title: "구독 관리 제목",
    component: () => (
      <>
        <Separator className="sperator h-[20px] w-auto bg-background1" />
        <p className="sub2-bold px-[20px] py-[10px]">구독 관리</p>
      </>
    ),
  },

  {
    title: "구독 관리",
    component: () => <SubscriptionEmailManagement />,
  },
  {
    title: "구독 토글 리스트",
    component: () => <SubscriptionManagementList />,
  },
];
export const UNAUTH_LINK: DropdownMenuItem[] = [
  {
    title: "로그인 또는 회원가입",
    component: ({ title }: { title: string }) => (
      <Link href="/auth">{title}</Link>
    ),
  },
  {
    title: "FEW와 협업하려면",
    component: ({ title }: { title: string }) => (
      <Link href="https://tally.so/r/nP0OMQ" target="_blank">
        {title}
      </Link>
    ),
  },
  {
    title: "인스타그램",
    component: ({ title }: { title: string }) => (
      <Link href="https://www.instagram.com/few.letter" target="_blank">
        {title}
      </Link>
    ),
  },
];
