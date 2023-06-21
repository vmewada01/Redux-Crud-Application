import axios from "axios";
import * as types from "./actionTypes";

const getTasks = () => (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  return axios
    .get("http://localhost:8080/tasks")
    .then((r) => {
      dispatch({ type: types.GET_TASKS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TASKS_FAILURE, payload: e });
    });
};

const getTagsList = () => (dispatch) => {
  dispatch({ type: types.GET_TAG_REQUEST });

  return axios
    .get("http://localhost:8080/tagList")
    .then((r) => {
      dispatch({ type: types.GET_TAG_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_TAG_FAILURE, payload: e });
    });
};

const updateSubtasksList = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_SUBTASKS_REQUEST });

  return axios
    .patch(`http://localhost:8080/tasks/${id}`, payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((r) => dispatch({ type: types.UPDATE_SUBTASKS_SUCCESS, payload: r }))
    .catch((e) => {
      dispatch({ type: types.UPDATE_SUBTASKS_FAILURE, payload: e });
    });
};

export { getTasks, getTagsList, updateSubtasksList };
