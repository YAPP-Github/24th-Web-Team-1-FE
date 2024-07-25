// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { createMetadata } from "@shared/utils/metadata";

import queryClient from "@api/queryClient";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const workbookId = params.id;

  const { data: workbookInfo } = await queryClient.fetchQuery({
    ...getWorkbookQueryOptions(workbookId),
  });
  const { title, description, mainImageUrl } = workbookInfo.data;

  return createMetadata({
    title: title,
    description: description,
    imageUrl: mainImageUrl,
  });
}

interface WorkbookLayoutProps {
  children: React.ReactNode;
}

export default function WorkbookLayout({ children }: WorkbookLayoutProps) {
  return <section className="w-full">{children}</section>;
}
