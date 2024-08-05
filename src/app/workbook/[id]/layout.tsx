// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { createMetadata } from "@shared/utils/metadata";

import queryClient from "@api/queryClient";
import { getWorkbookQueryOptions } from "@workbook/remotes/getWorkbookQueryOptions";
import TopBar from "@shared/components/TopBar";

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
  return (
    <section className="flex h-auto w-full flex-col justify-between">
      <div className="mb-[10px] flex flex-col">
        <div className="mx-[20px]">
          <TopBar />
        </div>
        {children}
      </div>
    </section>
  );
}
