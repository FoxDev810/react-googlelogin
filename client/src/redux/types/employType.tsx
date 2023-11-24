import { Employee } from '../../employees/types/employee';

export const GET_EMPLOY = 'GET_EMPLOY'
export const ADD_EMPLOY = 'ADD_EMPLOY'
export const UPDATE_EMPLOY = 'UPDATE_EMPLOY'
export const DELETE_EMPLOY = 'DELETE_EMPLOY'
export const GET_ERROR = 'GET_ERROR'
export const SUCCESS = 'SUCCESS'

export interface IEmploy {
    msg?: string | null,
    employees: Employee | string[],
    error: string | null,
    isAdding: boolean,
    isUpdating: boolean,
    isDeleting: boolean,
}