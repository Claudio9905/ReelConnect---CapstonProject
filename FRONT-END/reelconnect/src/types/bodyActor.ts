export default interface BodyActor {
  id: string;
  nome: string;
  cognome: string;
  eta: number;
  dataDiNascita: string;
  listaRiconoscimenti: RiconoscimentoAttore[];
}

interface RiconoscimentoAttore {
  id: string;
  nome: string;
  anno: string;
  tipoRiconoscimento: string;
}
