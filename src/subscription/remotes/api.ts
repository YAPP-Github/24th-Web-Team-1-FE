export const API_ROUTE = {
  SUBSCRIBE: (workbookId: string) => `/api/v1/workbooks/${workbookId}/subs`,
  UNSUBSCRIBE: () => `/api/v1/subscriptions/unsubs`,
  UNSUBSCRIBE_WORKBOOK: ({ workbookId }: { workbookId: string }) =>
    `/api/v1/workbooks/${workbookId}/unsubs`,
};
export const QUERY_KEY = {
  SUBSCRIBE_WORKBOOK: "sub-workbook",
  UNSUBSCRIBE_WORKBOOKS: "unsub-workbooks",
  UNSUBSCRIBE_WORKBOOK: "unsub-workbook",
};
