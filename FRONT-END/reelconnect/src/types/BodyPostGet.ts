import type BodyCommentoGet from "./BodyCommentoGet";
import type BodyUser from "./bodyUser";

export default interface BodyPostGet {
  id: string;
  descrizione: string;
  utente: BodyUser;
  imageUrl: string;
  dataCreazionePost: string;
  numCiak: number;
  listaCommenti: BodyCommentoGet[];
}
