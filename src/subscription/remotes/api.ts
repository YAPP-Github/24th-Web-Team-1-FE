export const API_ROUTE = {
  SUBSCRIBE: (workbookId: string) => `/api/v1/workbooks/${workbookId}/subs`,
  UNSUBSCRIBE: () => `/api/v1/subscriptions/unsubs`
};
export const QUERY_KEY = {
  SUBSCRIBE_WORKBOOK: "sub-workbook",
  UNSUBSCRIBE_WORKBOOK: "unsub-workbook"
};
