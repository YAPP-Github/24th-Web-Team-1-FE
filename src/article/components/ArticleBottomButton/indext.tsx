import { Button } from "@shared/components/ui/button";
import React, { HTMLAttributes } from "react";

interface ArticleBottomButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export default function ArticleBottomButton({
  title,
}: ArticleBottomButtonProps) {
  return <Button className="w-full rounded-none bg-main">{title}</Button>;
}
