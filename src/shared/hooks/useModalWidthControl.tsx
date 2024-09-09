"use client";
import { useEffect } from "react";

export default function useModalWidthControl() {
  useEffect(function removeAttribute() {
    const intervalId = setInterval(() => {
      document.body.removeAttribute("data-scroll-locked");
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
}
