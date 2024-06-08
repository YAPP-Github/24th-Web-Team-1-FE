"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getTagQueryOptions } from "@quiz/remotes/getTagQueryOptions";

import Tag from "@common/components/Tag";

export default function TagList() {
  const { data: tagInfo, isError } = useQuery({ ...getTagQueryOptions() });

  if (isError) <div>error</div>;

  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagInfo?.tags.map((tag) => <Tag key={tag} title={tag} />)}
    </div>
  );
}
