"use client";

import { PropsWithChildren, useEffect, useState } from "react";

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === "enable";

export default function MSWProviders({ children }: PropsWithChildren) {
  const [mswReady, setMSWReady] = useState(() => !isMockingMode);

  useEffect(
    function setMswMocks() {
      const init = async () => {
        if (isMockingMode) {
          const initMocks = await import("@mocks/index").then(
            (res) => res.initMocks,
          );
          await initMocks();
          setMSWReady(true);
        }
      };
      if (!mswReady) init();
    },
    [mswReady],
  );

  if (!mswReady) return null;

  return <>{children}</>;
}
