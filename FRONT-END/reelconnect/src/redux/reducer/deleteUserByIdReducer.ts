import type ActionTypes from "../../types/ActionTypes";
import { DELETE_USER_BY_ID, LOADING_USER } from "../actions/actions";

type stateType = {
  singleUser: [];
  isLoading: boolean;
};

const initialState: stateType = {
  singleUser: [],
  isLoading: false,
};

const deleteUserByIdReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DELETE_USER_BY_ID:
      return {
        ...state,
        singleUser: action.payload,
      };
    default:
      return state;
  }
};

export default deleteUserByIdReducer;
