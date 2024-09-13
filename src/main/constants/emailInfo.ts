export const SUBSCRIPTION_DAYS = {
  EVERY_DAYS: "EVERY_DAYS",
  WEEK_DAYS: "WEEK_DAYS",
} as const;

export const SUBSCRIPTION_TIMES = {
  "06": "06",
  "07": "07",
  "08": "08",
  "09": "09",
  "10": "10",
} as const;

export const SUBSCRIPTION_EMAIL_CLIENT_INFO = {
  TIME: {
    "06": "6",
    "07": "7",
    "08": "8",
    "09": "9",
    "10": "10",
  },
  DAY: {
    [SUBSCRIPTION_DAYS.EVERY_DAYS]: "매일 받을래요",
    [SUBSCRIPTION_DAYS.WEEK_DAYS]: "주말에는 안 받을래요",
  },
} as const;

export const SUBSCRIPTION_EMAIL_SERVER_INFO = {
  TIME: {
    "06": "06:00",
    "07": "07:00",
    "08": "08:00",
    "09": "09:00",
    "10": "10:00",
  },
  DAY: {
    EVERY_DAYS: "1111111",
    WEEK_DAYS: "0011111",
  },
} as const;
