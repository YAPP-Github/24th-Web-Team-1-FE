import React, { HTMLAttributes } from "react";

interface LinkSharedDescriptionProps extends HTMLAttributes<HTMLSpanElement> {}
export default function LinkSharedDescription({
  content,
}: LinkSharedDescriptionProps) {
  return <span className="pt-[10px]">{content}</span>;
}
