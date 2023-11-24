import { UserInfo } from '../../auth/types/userInfo';

export const AUTH = 'AUTH'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'
export const AUTH_ERROR = 'AUTH_ERROR'
export const USER_LOADED = 'USER_LOADED'
export const LOADING = 'LOADING'
export const ALERT = 'ALERT'

export interface IAuth {
    msg?: string | null
    access_token?: string
    user: UserInfo | string[],
    loading?: boolean,
    error: string | null,
    isAuthenticated: boolean,
    token?: string | null
}