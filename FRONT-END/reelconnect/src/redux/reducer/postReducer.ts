import type ActionTypes from "../../types/ActionTypes";
import type BodyPostGet from "../../types/BodyPostGet";
import { GET_ALL_POST, LOADING_COMMENTO_POST } from "../actions/actions";

type stateType = {
  post: BodyPostGet[];
  isLoading: boolean;
};

const initialState: stateType = {
  post: [],
  isLoading: false,
};

const postReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_COMMENTO_POST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
