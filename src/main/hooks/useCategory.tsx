"use client";
import { CategoryClientInfo } from "@common/types/category";
import { useState } from "react";

export default function useCategory() {
  const [category, setCategory] = useState<CategoryClientInfo>();
  const handleCategory = (category: CategoryClientInfo) => {
    setCategory(category);
  };
  return { category, handleCategory };
}
