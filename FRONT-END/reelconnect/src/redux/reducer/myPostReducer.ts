import type ActionTypes from "../../types/ActionTypes";
import type BodyPost from "../../types/BodyPost";
import { GET_MY_POST, LOADING_COMMENTO_POST } from "../actions/actions";

type stateType = {
  post: BodyPost[];
  isLoading: boolean;
};

const initialState: stateType = {
  post: [],
  isLoading: false,
};

const myPostReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_COMMENTO_POST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_MY_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default myPostReducer;
