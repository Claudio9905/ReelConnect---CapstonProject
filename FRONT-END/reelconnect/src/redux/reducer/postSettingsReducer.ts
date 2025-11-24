import type ActionTypes from "../../types/ActionTypes";
import type BodyPost from "../../types/BodyPost";
import {
  CREATE_POST,
  DELETE_A_POST,
  DELETE_MY_POST,
  EDIT_IMAGE_POST,
  EDIT_MY_POST,
  LOADING_COMMENTO_POST,
} from "../actions/actions";

type stateType = {
  post: BodyPost;
  isLoading: boolean;
};

const initialState: stateType = {
  post: {
    descrizione: "",
    utenteId: "",
    imagePost: new FormData(),
  },
  isLoading: false,
};

const postSettingsReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_COMMENTO_POST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case EDIT_MY_POST:
      return {
        ...state,
        post: action.payload,
      };
    case EDIT_IMAGE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_MY_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_A_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default postSettingsReducer;
