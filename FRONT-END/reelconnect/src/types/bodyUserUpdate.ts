export default interface BodyUserUpdate {
  nome: string;
  cognome: string;
  username: string;
  eta: number | undefined;
  dataDiNascita: string;
  sesso: string;
  email: string;
  avatarImage: FormData;
  bannerImage: FormData;
}
