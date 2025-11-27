import type ActionTypes from "../../types/ActionTypes";
import type BodySerieTvGet from "../../types/BodySerieTvGet";
import {
  GET_SINGLE_SERIE_TV_BY_TITOLO,
  LOADING_FILM_SERIETV,
} from "../actions/actions";

type stateType = {
  films: BodySerieTvGet;
  isLoading: boolean;
};

const initialState: stateType = {
  films: {
    id: "",
    titolo: "",
    descrizione: "",
    annoDiUscita: "",
    numStagioni: 0,
    numEpisodi: 0,
    durataMediaEpisodio: 0,
    genere: [],
    listaSerieTv: [],
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

const getSerieTvByTitoloReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_SINGLE_SERIE_TV_BY_TITOLO:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default getSerieTvByTitoloReducer;
