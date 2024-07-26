"use client";
import { useState } from "react";

export default function useCategory() {
  const [category, setCategory] = useState("");
  const handleCategory = (category: string) => {
    setCategory(category);
  };
  return { category, handleCategory };
}
