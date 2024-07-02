// app/workbook/[id]/layout.tsx
import type { Metadata } from "next";

import { ApiResponse } from "@api/api-config";

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

  return {
    title: workbookInfo.title,
    description: workbookInfo.description,
    openGraph: {
      title: workbookInfo.title,
      description: workbookInfo.description,
      images: [
        {
          url: workbookInfo.mainImageUrl,
          width: 800,
          height: 600,
          alt: "Workbook Image",
        },
      ],
    },
    twitter: {
      title: workbookInfo.title,
      description: workbookInfo.description,
      images: [workbookInfo.mainImageUrl],
    },
  };
}

interface WorkbookLayoutProps {
  children: React.ReactNode;
}

export default function WorkbookLayout({ children }: WorkbookLayoutProps) {
  return <section>{children}</section>;
}
