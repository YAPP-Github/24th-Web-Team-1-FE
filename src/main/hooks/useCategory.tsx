"use client";
import { CategoryInfo } from "@common/types/category";
import { useState } from "react";

export default function useCategory() {
  const [category, setCategory] = useState<CategoryInfo>();
  const handleCategory = (category: CategoryInfo) => {
    setCategory(category);
  };
  return { category, handleCategory };
}
