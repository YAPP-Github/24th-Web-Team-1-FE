import mixpanel, { Dict } from "mixpanel-browser";

const MX_TOKEN = process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN;
const isDebug = process.env.NODE_ENV === "development";

const actions = {
  init: () =>
    mixpanel.init(MX_TOKEN as string, {
      debug: isDebug,
    }),

  identify: ({ id }: { id: string }) => {
    if (typeof window === "undefined") return;
    mixpanel.identify(id);
  },
  reset: () => mixpanel.reset(),
  track: ({ name, property }: { name: string; property?: Dict }) => {
    mixpanel.track(name, property);
  },
  people: {
    set: ({ peoples }: { peoples: Dict }) => {
      if (typeof window === "undefined") return;
      mixpanel.people.set(peoples);
    },
  },
};

export const Mixpanel = actions;
