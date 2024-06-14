export const _1_SECOND = 1_000;
export const _3_SECOND = 3_000;


export const delay = (second = _3_SECOND) => new Promise((resolve) => setTimeout(resolve, second));
