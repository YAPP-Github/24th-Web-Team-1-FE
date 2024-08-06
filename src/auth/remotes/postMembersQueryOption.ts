import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch,FewResponse } from "@api/fewFetch";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { API_ROUTE, QUERY_KEY } from "./api";
import { memberSaveBody, memberSaveResponse } from "@auth/types/auth";


export const memberSave = (
    body: memberSaveBody
): Promise<ApiResponse<memberSaveResponse>> => {
    return fewFetch().post(API_ROUTE.MEMBERS(), {
        body: JSON.stringify(body),
    })
}

export const memberSaveOptions = (): UseMutationOptions<
    ApiResponse<memberSaveResponse>,
    Error,
    memberSaveBody
> => {
    return {
        mutationKey: [QUERY_KEY.MEMBERS],
        mutationFn: (body) => memberSave(body),
    }
}