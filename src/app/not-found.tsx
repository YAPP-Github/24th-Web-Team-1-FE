"use client";

import GoToMainButton from "@common/components/GoToMainButton";
import NotFoundExplanation from "@common/components/NotFoundExplanation";
import NotFoundLogo from "public/notFoundLogo.svg";

export default function NotFound() {
  return (
    <main className="flex h-auto w-full flex-col items-center justify-center space-y-[85px]">
      <NotFoundLogo data-testid="not-found-logo" />
      <NotFoundExplanation />
      <div className="px-[20px] w-full">
        <GoToMainButton />
      </div>
    </main>
  );
}
