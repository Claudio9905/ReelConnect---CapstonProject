import type ActionTypes from "../../types/ActionTypes";
import type BodyFilmGet from "../../types/bodyFilmGet";
import {
  GET_SINGLE_FILM_BY_TITOLO,
  LOADING_FILM_SERIETV,
} from "../actions/actions";

type stateType = {
  films: BodyFilmGet;
  isLoading: boolean;
};

const initialState: stateType = {
  films: {
    id: "",
    titolo: "",
    descrizione: "",
    annoDiUscita: "",
    durataFilm: 0,
    genere: [],
    listaRiconoscimentiFilm: [],
    listaAttori: [],
    regista: {
      id: "",
      nome: "",
      cognome: "",
      eta: 0,
      dataDiNascita: "",
      immagineProfilo: "",
    },
    coverUrl: "",
  },
  isLoading: false,
};

const getFilmByTitoloReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_SINGLE_FILM_BY_TITOLO:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default getFilmByTitoloReducer;
