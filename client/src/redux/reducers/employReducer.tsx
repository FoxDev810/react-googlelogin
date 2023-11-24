import {
  GET_EMPLOY,
  ADD_EMPLOY,
  UPDATE_EMPLOY,
  DELETE_EMPLOY,
  GET_ERROR,
  IEmploy,
  SUCCESS
} from "../types/employType";

const initialState: IEmploy = {
    employees: [],
    error: null,
    msg: null,
    isAdding: false,
    isUpdating: false,
    isDeleting: false
}

const employReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_EMPLOY:
            return {
                ...state,
                employees: action.payload.employees
            }
        case ADD_EMPLOY:
            return {
                ...state,
                employees: action.payload.employees,
                isAdding: true,
                msg: action.payload.msg
            }
        case UPDATE_EMPLOY:
            return {
                ...state,
                employees: action.payload.employees,
                isUpdating: true
            }
        case DELETE_EMPLOY:
            return {
                ...state,
                employees: action.payload.employees,
                isDeleting: true,
                msg: action.payload.msg
            }
        case GET_ERROR:
            return {
                ...state,
                employees: [],
                isAdding: false,
                isUpdating: false,
                isDeleting: false,
            }
        case SUCCESS:
            return {
                ...state,
                isAdding: false,
                isUpdating: false,
                isDeleting: false,
            }
        default:
            return state
    }
}

export default employReducer