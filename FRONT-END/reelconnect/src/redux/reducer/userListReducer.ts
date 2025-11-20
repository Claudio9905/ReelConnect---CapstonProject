import type ActionTypes from "../../types/ActionTypes";
import { GET_ALL_USERS, LOADING_USER } from "../actions/actions";

type stateType = {
  listUser: [];
  isLoading: boolean;
};

const initialState: stateType = {
  listUser: [],
  isLoading: false,
};

const userListReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        profileUser: action.payload,
      };

    default:
      return state;
  }
};

export default userListReducer;
