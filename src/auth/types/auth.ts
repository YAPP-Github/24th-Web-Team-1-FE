export type memberSaveBody = {
    email: string
}

export type memberSaveResponse = {
    isSendAuth: boolean
}

export type tokenResponse = {
    accessToken: string
    refreshToken: string
    isLogin: boolean
}