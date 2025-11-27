import type BodyUser from "./bodyUser";

export default interface BodyCommentoGet {
  id: string;
  descrizione: string;
  dataCreazioneCommento: string;
  postId: string;
  utente: BodyUser;
}
