"use client";
import { useEffect } from "react";

import { EVENT_NAME } from "@shared/constants/mixpanel";
import { Mixpanel } from "@shared/utils/mixpanel";

interface TrackMixpanelProps {
  eventKey: (typeof EVENT_NAME)[keyof typeof EVENT_NAME];
  property?: { [key: string]: any };
  dep?: any;
}
export default function useTrackMixpanel({
  eventKey,
  property,
  dep,
}: TrackMixpanelProps) {
  useEffect(
    function trackMixpanel() {
      Mixpanel.identify({ id: "hee" });
      Mixpanel.people.set({ peoples: { $email: "happgee" } });
      if (property)
        Mixpanel.track({
          name: eventKey,
          property,
        });
      else {
        Mixpanel.track({
          name: eventKey,
        });
      }
    },
    [dep],
  );
}
