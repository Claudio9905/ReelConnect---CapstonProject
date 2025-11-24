import type ActionTypes from "../../types/ActionTypes";
import type BodyCommento from "../../types/BodyCommento";
import {
  GET_COMMENTI_BY_POST,
  LOADING_COMMENTO_POST,
} from "../actions/actions";

type stateType = {
  commento: BodyCommento[];
  isLoading: boolean;
};

const initialState: stateType = {
  commento: [],
  isLoading: false,
};

const commentiReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_COMMENTO_POST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_COMMENTI_BY_POST:
      return {
        ...state,
        commento: action.payload,
      };
  }
};

export default commentiReducer;
