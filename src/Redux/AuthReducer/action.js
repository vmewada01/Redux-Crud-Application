import axios from "axios";
import * as types from "./actionTypes";

const login = (params) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://reqres.in/api/login", params)
    .then((r) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
    });
};

export { login };
