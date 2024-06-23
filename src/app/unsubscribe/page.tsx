"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import UnsubscribeForm from "@workbook/components/UnsubscribeForm";
import UnsubscribeTitle from "@workbook/components/UnsubscribeTitle";

export default function UnsubscribePage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  useEffect(
    () =>
      function makeQueryStringInvisible() {
        if (user) {
          const newPath = pathname.split("?")[0];
          router.replace(newPath);

          // console.log(user);
        }
      },
    [user, pathname, router],
  );

  return (
    <div className="flex h-full flex-col space-y-10">
      <UnsubscribeTitle />
      <UnsubscribeForm />
    </div>
  );
}
