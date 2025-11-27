import type ActionTypes from "../../types/ActionTypes";
import type BodyCommentoGet from "../../types/BodyCommentoGet";
import {
  CREATE_COMMENTO,
  DELETE_MY_COMMENTO,
  EDIT_MY_COMMENTO,
  LOADING_COMMENTO_POST,
} from "../actions/actions";

type stateType = {
  commento: BodyCommentoGet;
  isLoading: boolean;
};

const initialState: stateType = {
  commento: {
    id: "",
    descrizione: "",
    postId: "",
    utenteId: "",
    dataCreazioneCommento: "",
  },
  isLoading: false,
};

const commentiSettingsReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_COMMENTO_POST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CREATE_COMMENTO:
      return {
        ...state,
        commento: action.payload,
      };
    case EDIT_MY_COMMENTO:
      return {
        ...state,
        commento: action.payload,
      };
    case DELETE_MY_COMMENTO:
      return {
        ...state,
        commento: action.payload,
      };
    default:
      return state;
  }
};

export default commentiSettingsReducer;
