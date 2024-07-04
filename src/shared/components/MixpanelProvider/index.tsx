"use client";

import { Mixpanel } from "@shared/utils/mixpanel";
import React, { useEffect } from "react";

export default function MixpanelProvider({
  children,
}: React.PropsWithChildren) {
  useEffect(function setMixpanel() {
    Mixpanel.init();
  }, []);

  return children;
}
