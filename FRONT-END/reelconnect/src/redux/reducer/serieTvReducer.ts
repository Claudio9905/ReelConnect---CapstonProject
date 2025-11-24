import type ActionTypes from "../../types/ActionTypes";
import type BodySerieTv from "../../types/BodySerieTv";
import { GET_ALL_SERIES_TV, LOADING_FILM_SERIETV } from "../actions/actions";

type stateType = {
  seriesTV: BodySerieTv[];
  isLoading: boolean;
};

const initialState: stateType = {
  seriesTV: [],
  isLoading: false,
};

const serieTvReducer = (state = initialState, action: ActionTypes<string>) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_ALL_SERIES_TV:
      return {
        ...state,
        seriesTv: action.payload,
      };
    default:
      return state;
  }
};

export default serieTvReducer;
