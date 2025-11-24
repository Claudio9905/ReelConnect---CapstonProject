import type ActionTypes from "../../types/ActionTypes";
import { DELETE_FILM_BY_ID, LOADING_FILM_SERIETV } from "../actions/actions";

type stateType = {
  films: [];
  isLoading: boolean;
};

const initialState: stateType = {
  films: [],
  isLoading: false,
};

const deleteFilmByIdReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DELETE_FILM_BY_ID:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default deleteFilmByIdReducer;
