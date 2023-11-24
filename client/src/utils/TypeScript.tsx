import { FormEvent } from 'react'
import rootReducer from '../redux/reducers/index'

export type FormSubmit = FormEvent<HTMLFormElement>
export type RootStore = ReturnType<typeof rootReducer>

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
    password2: string
}

export interface IAlert {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}