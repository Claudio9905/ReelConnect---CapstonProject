import type ActionTypes from "../../types/ActionTypes";
import type BodyPostGet from "../../types/BodyPostGet";
import {
  CREATE_POST,
  DELETE_A_POST,
  DELETE_MY_POST,
  EDIT_IMAGE_POST,
  EDIT_MY_POST,
  LOADING_COMMENTO_POST,
  NOSUCCESSPOST,
  SUCCESSPOST,
} from "../actions/actions";

type stateType = {
  post: BodyPostGet;
  isLoading: boolean;
  status: string;
};

const initialState: stateType = {
  post: {
    id: "",
    descrizione: "",
    utente: {
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
    imageUrl: "",
    dataCreazionePost: "",
    numCiak: 0,
    numCommenti: 0,
    listaCommenti: [],
  },
  isLoading: false,
  status: "",
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
    case SUCCESSPOST:
      return {
        ...state,
        status: action.payload,
      };
    case NOSUCCESSPOST:
      return {
        ...state,
        status: action.payload,
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
