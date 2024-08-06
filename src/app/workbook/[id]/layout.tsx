// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { createMetadata } from "@shared/utils/metadata";

import { HydrationBoundary } from "@tanstack/react-query";
import { prefetchWorkbookQuery } from "@workbook/remotes/prefetchWorkbookQuery";
import { WorkbookPageProps } from "@workbook/types";

import TopBar from "@shared/components/TopBar";

export async function generateMetadata({
  params,
}: WorkbookPageProps): Promise<Metadata> {
  const { data: workbookInfo } = await prefetchWorkbookQuery({ params });
  const { title, description, mainImageUrl } = workbookInfo;

  return createMetadata({
    title: title,
    description: description,
    imageUrl: mainImageUrl,
  });
}

interface WorkbookLayoutProps {
  children: React.ReactNode;
}

export default async function WorkbookLayout({
  params,
  children,
}: WorkbookPageProps & WorkbookLayoutProps) {
  const { state } = await prefetchWorkbookQuery({ params });
  return (
    <HydrationBoundary state={state}>
      <section className="flex h-auto w-full flex-col justify-between">
        <div className="mb-[10px] flex flex-col">
          <div className="mx-[20px]">
            <TopBar />
          </div>
          {children}
        </div>
      </section>
    </HydrationBoundary>
  );
}
