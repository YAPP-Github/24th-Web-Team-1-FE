// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { createMetadata } from "@shared/utils/metadata";

import { fewFetch } from "@api/fewFetch";
import { API_ROUTE } from "@workbook/remotes/api";
import { WorkbookInfo } from "@workbook/types";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const { data: workbookInfo } = await fewFetch().get<WorkbookInfo>(
    `${API_ROUTE.WORKBOOK(id)}`,
  );
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
