// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { ApiResponse } from "@api/api-config";

import { createMetadata } from "@shared/utils/metadata";

import { API_ROUTE } from "@workbook/remotes/api";
import { WorkbookInfo } from "@workbook/types";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTE.WORKBOOK(id)}`,
  );
  const { data: workbookInfo }: ApiResponse<WorkbookInfo> = await response.json();

  const { title, description, mainImageUrl } = workbookInfo

   return createMetadata({
    title: title,
    description: description,
    imageUrl: mainImageUrl
  });
}

interface WorkbookLayoutProps {
  children: React.ReactNode;
}

export default function WorkbookLayout({ children }: WorkbookLayoutProps) {
  return <section>{children}</section>;
}
