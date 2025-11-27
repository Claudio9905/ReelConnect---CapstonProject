import type ActionTypes from "../../types/ActionTypes";
import type BodyUser from "../../types/bodyUser";
import { EDIT_USER_BY_ID, LOADING_USER } from "../actions/actions";

type stateType = {
  singleUser: BodyUser;
  isLoading: boolean;
};

const initialState: stateType = {
  singleUser: {
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

const editUserByIdReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case EDIT_USER_BY_ID:
      return {
        ...state,
        singleUser: action.payload,
      };
    default:
      return state;
  }
};

export default editUserByIdReducer;
