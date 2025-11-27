import type BodyActor from "./bodyActor";
import type BodyRegista from "./BodyRegista";

export default interface BodyFilmGet {
  id: string;
  titolo: string;
  descrizione: string;
  annoDiUscita: string;
  durataFilm: number;
  genere: string[];
  listaRiconoscimentiFilm: BodyRiconoscimento[];
  listaAttori: BodyActor[];
  regista: BodyRegista;
  coverUrl: string;
}

interface BodyRiconoscimento {
  id: string;
  nome: string;
  anno: number;
  tipoRiconoscimento: string;
}
