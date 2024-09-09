"use client";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";
import UpIcon from "public/assets/icon/up.svg";
import { useEffect, useState } from "react";
export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(function setScrollShowButton() {
    const handleShowButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className="fixed bottom-[10px] left-[80%] z-10 w-fit">
          <Button
            id="top"
            onClick={scrollToTop}
            type="button"
            className={cn(
              "h-[36px] w-[36px] p-0",
              "rounded-full border-[0.5px] border-text-gray2 bg-white",
              "hover:bg-white",
            )}
          >
            <UpIcon width={22} height={26} />
          </Button>
        </div>
      )}
    </>
  );
}
