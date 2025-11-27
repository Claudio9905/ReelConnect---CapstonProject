import type ActionTypes from "../../types/ActionTypes";
import type BodyFilm from "../../types/BodyFilm";
import { GET_ALL_FILMS, LOADING_FILM_SERIETV } from "../actions/actions";

type stateType = {
  films: BodyFilm[];
  isLoading: boolean;
};

const initialState: stateType = {
  films: [],
  isLoading: false,
};

const filmReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_ALL_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default filmReducer;
