import type ActionTypes from "../../types/ActionTypes";
import type BodySerieTv from "../../types/BodySerieTv";
import { CREATE_A_SERIE_TV, LOADING_FILM_SERIETV } from "../actions/actions";

type stateType = {
  films: BodySerieTv;
  isLoading: boolean;
};

const initialState: stateType = {
  films: {
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

const createSerieTvReducer = (
  state = initialState,
  action: ActionTypes<string>
) => {
  switch (action.type) {
    case LOADING_FILM_SERIETV:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CREATE_A_SERIE_TV:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export default createSerieTvReducer;
