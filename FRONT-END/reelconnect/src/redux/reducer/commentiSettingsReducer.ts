import type ActionTypes from "../../types/ActionTypes";
import type BodyCommentoGet from "../../types/BodyCommentoGet";
import {
  CREATE_COMMENTO,
  DELETE_MY_COMMENTO,
  EDIT_MY_COMMENTO,
  LOADING_COMMENTO_POST,
  NOSUCCESS,
  SUCCESS,
} from "../actions/actions";

type stateType = {
  commento: BodyCommentoGet[];
  isLoading: boolean;
  status: string;
};

const initialState: stateType = {
  commento: [],
  isLoading: false,
  status: "",
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
    case SUCCESS:
      return {
        ...state,
        status: action.payload,
      };
    case NOSUCCESS:
      return {
        ...state,
        status: action.payload,
      };
    case CREATE_COMMENTO:
      return {
        ...state,
        commento: [...state.commento, action.payload],
      };

    case EDIT_MY_COMMENTO:
      return {
        ...state,
        commento: action.payload,
      };
    case DELETE_MY_COMMENTO:
      return {
        ...state,
        commento: state.commento.filter((c) => c.id != action.payload),
      };
    default:
      return state;
  }
};

export default commentiSettingsReducer;
