"use client";

import React from "react";

import { ApiResponse } from "@api/api-config";
import queryClient from "@api/query-client";

import Tag from "@common/components/Tag";
import { PromblemInfo } from "@problem/types/problemInfo";

export default function TagList() {
  const problemInfoData = queryClient.getQueryData(["get-Problems-info"]) as
    | ApiResponse<PromblemInfo>
    | undefined;

  if (!problemInfoData) return <div>error</div>;

  const { day } = problemInfoData.data;
  const tagList = [day];

  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagList.map((tag) => (
        <Tag key={tag} title={tag} />
      ))}
    </div>
  );
}
