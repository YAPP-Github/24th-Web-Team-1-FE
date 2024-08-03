import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { API_ROUTE, QUERY_KEY } from "./api";

export const logOut = () => {
    return fewFetch().delete(API_ROUTE.LOGOUT())
}

export const logOutOptions = (): UseMutationOptions<
    ApiResponse<any>,
    Error
> => {
    return {
        mutationKey: [QUERY_KEY.LOGOUT],
        mutationFn: () => logOut()
    }
}