import type BodyCommentoGet from "./BodyCommentoGet";

export default interface BodyPostGet {
  id: string;
  descrizione: string;
  utenteId: string;
  imagePost: string;
  dataCreazionePost: string;
  numCiak: 0;
  listaCommenti: BodyCommentoGet[];
}
