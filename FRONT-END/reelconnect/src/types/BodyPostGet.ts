import type BodyCommentoGet from "./BodyCommentoGet";

export default interface BodyPostGet {
  id: string;
  descrizione: string;
  utenteId: string;
  imagePost: string;
  dataCreazionePost: string;
  numCiak: number;
  listaCommenti: BodyCommentoGet[];
}
