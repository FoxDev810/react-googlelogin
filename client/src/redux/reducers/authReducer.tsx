import { ALERT } from '../types/alertType'
import { LOGIN, REGISTER, LOGOUT, AUTH_ERROR, IAuth, LOADING } from '../types/authType'

const initialState: IAuth = {
    loading: false,
    user: [],
    error: null,
    isAuthenticated: false,
    token: localStorage.getItem('auth-token'),
    msg: null
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true
            }
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case REGISTER:
            localStorage.setItem('auth-token', action.payload.access_token);
            return {
                ...state,
                user: action.payload.user,
                error: null,
            }
        case LOGOUT:
            localStorage.removeItem('auth-token')
            return {
                ...state,
                loading: false,
                user: [],
                isAuthenticated: false,
                error: null,
                token: null,
            }
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                user: [],
                error: action.payload
            }
        case ALERT:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer