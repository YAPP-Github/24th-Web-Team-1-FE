"use client";
import React from "react";
import Lottie from "react-lottie-player";

interface LottieClientProps {
  animationData: object;
}
export default function LottieClient({ animationData }: LottieClientProps) {
  return (
    <Lottie
      animationData={animationData}
      play
      loop={false}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
