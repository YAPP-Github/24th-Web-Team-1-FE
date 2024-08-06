// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { createMetadata } from "@shared/utils/metadata";

import { HydrationBoundary } from "@tanstack/react-query";
import { prefetchWorkbookQuery } from "@workbook/remotes/prefetchWorkbookQuery";
import { WorkbookPageProps } from "@workbook/types";

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
      <section className="w-full">{children}</section>;
    </HydrationBoundary>
  );
}
