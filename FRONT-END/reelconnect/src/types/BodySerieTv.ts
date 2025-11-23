import type BodyActor from "./bodyActor";
import type BodyRegista from "./BodyRegista";

export default interface BodySerieTv {
  titolo: string;
  descrizione: string;
  annoDiUscita: string;
  numStagioni: number;
  numEpisodi: number;
  durataMediaEpisodio: number;
  genere: string[];
  listaSerieTv: RiconoscimentoSerieTv[];
  listaAttori: BodyActor[];
  regista: BodyRegista;
  coverUrl: string;
}

interface RiconoscimentoSerieTv {
  id: string;
  nome: string;
  anno: number;
  tipo: string;
}
