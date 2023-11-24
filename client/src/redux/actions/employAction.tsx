import {
  GET_EMPLOY,
  ADD_EMPLOY,
  UPDATE_EMPLOY,
  DELETE_EMPLOY,
  GET_ERROR,
  SUCCESS
} from "../types/employType";
import { Employee } from "../../employees/types/employee";
import { getAPI, postAPI, putAPI, deleteAPI } from "../../utils/FetchData";

export const getEmploy = () => async (dispatch: React.Dispatch<any>) => {
  try {
    const res = await getAPI("employees");

    dispatch({
      type: GET_EMPLOY,
      payload: {
        employees: res.data,
        msg: res.data.msg,
      },
    });
  } catch (err: any) {
    dispatch({
      type: GET_ERROR,
      payload: {},
    });
  }
};

export const addEmploy =
  (formData: Employee) => async (dispatch: React.Dispatch<any>) => {
    try {
      const res = await postAPI("employees", formData);

      dispatch({
        type: ADD_EMPLOY,
        payload: {
          employees: res.data.employees,
          employee: res.data.employee,
          msg: res.data.msg
        }
      });
      
      dispatch({
        type: SUCCESS
      });
    } catch (err: any) {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      });
    }
};

export const updateEmploy =
  (formData: Employee) => async (dispatch: React.Dispatch<any>) => {
    try {
      const res = await putAPI(`employees/${formData.id}`, formData);

      dispatch({
        type: UPDATE_EMPLOY,
        payload: {
          employees: res.data.employees,
          employee: res.data.employee,
          msg: res.data.msg
        }
      });
      dispatch({
        type: SUCCESS
      })
    } catch (err: any) {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      });
    }
};

export const deleteEmploy =
  (formData: any) => async (dispatch: React.Dispatch<any>) => {
    try {
      console.log(formData);
      const res = await deleteAPI(`employees/${formData}`);

      dispatch({
        type: DELETE_EMPLOY,
        payload: {
          employees: res.data.employees,
          employee: res.data.employee,
          msg: res.data.msg
        }
      });
      dispatch({
        type: SUCCESS
      })
    } catch (err: any) {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      });
    }
};


