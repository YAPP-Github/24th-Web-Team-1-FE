"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import Tag from "@common/components/Tag";
import { getTagQueryOptions } from "@problem/remotes/getTagQueryOptions";

export default function TagList() {
  const { data: tagInfo, isError } = useQuery({ ...getTagQueryOptions() });
  if (isError) return <div>error</div>;

  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagInfo?.tags.map((tag) => <Tag key={tag} title={tag} />)}
    </div>
  );
}
