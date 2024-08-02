export type memberSaveBody = {
    email: string
}

export type memberSaveResponse = {
    sendAuth: boolean
}

export type tokenResponse = {
    accessToken: string
    refreshToken: string
    isLogin: boolean
}