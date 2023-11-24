import {
  LOGIN,
  REGISTER,
  LOGOUT,
  AUTH_ERROR,
  LOADING,
  ALERT
} from "../types/authType";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";

export const login =
  (userLogin: IUserLogin) => async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch({
        type: LOADING,
      });

      const res = await postAPI("users/login", userLogin);

      dispatch({
        type: LOGIN,
        payload: {
          user: res.data.user,
          token: res.data.access_token,
        },
      });
      dispatch({
        type: ALERT
      });
    } catch (err: any) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const register =
  (userRegister: IUserRegister) => async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch({
        type: LOADING,
      });

      const res = await postAPI("users/register", userRegister);

      dispatch({
        type: REGISTER,
        payload: { 
          user: res.data.user,
          msg: res.data.message,
          access_token: res.data.access_token
        },
      });

      dispatch({
        type: ALERT
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.message } });
    }
  };

export const logout = () => async (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: LOGOUT
  })
}
