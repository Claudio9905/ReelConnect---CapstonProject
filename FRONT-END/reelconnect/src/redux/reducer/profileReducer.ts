import type ActionTypes from "../../types/ActionTypes";
import type BodyUser from "../../types/bodyUser";
import {
  DELETE_MY_PROFILE,
  EDIT_MY_AVATAR_PROFILE,
  EDIT_MY_BANNER_PROFILE,
  EDIT_MY_PROFILE,
  GET_MY_PROFILE,
  LOADING_PROFILE,
} from "../actions/actions";

type stateType = {
  myProfile: BodyUser;
  isLoading: boolean;
};

const initialState: stateType = {
  myProfile: {
    id: "",
    nome: "",
    cognome: "",
    username: "",
    eta: 0,
    dataDiNascita: "",
    sesso: "",
    email: "",
    avatarUrl: "",
    bannerUrl: "",
    role: "",
  },
  isLoading: false,
};

const profileReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
        isLoading: false,
      };

    case EDIT_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };

    case DELETE_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };

    case EDIT_MY_AVATAR_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };

    case EDIT_MY_BANNER_PROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
