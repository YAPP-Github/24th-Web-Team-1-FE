import { DropdownMenuItem } from "@main/types/dropdownMenu";
import Link from "next/link";
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
    component: ({ title }: { title: string }) => (
      <Link href="/" onClick={() => window.location.reload()}>
        {title}
      </Link>
    ),
  },

  {
    title: "로그아웃",
    component: ({ title }: { title: string }) => (
      <Link href="/" onClick={() => window.location.reload()}>
        {title}
      </Link>
    ),
  },
  {
    title: "FEW와 협업하려면",
    component: ({ title }: { title: string }) => (
      <Link href="https://www.instagram.com/few.letter" target="_blank">
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
      <Link href="https://www.instagram.com/few.letter" target="_blank">
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
