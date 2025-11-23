import type BodyCommento from "../../types/BodyCommento";
import type BodyFilm from "../../types/bodyFilm";
import type BodyPost from "../../types/BodyPost";
import type BodySerieTv from "../../types/BodySerieTv";
import type BodyUserUpdate from "../../types/bodyUserUpdate";
import type { AppDispatch } from "../store";

export const LOADING_PROFILE = "LOADING_PROFILE";

export const loadingProfile = () => {
  return {
    type: LOADING_PROFILE,
    payload: true,
  };
};

// ACTIONS e API per il componente MyProfile
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const EDIT_MY_PROFILE = "EDIT_MY_PROFILE";
export const DELETE_MY_PROFILE = "DELETE_MY_PROFILE";
export const EDIT_MY_AVATAR_PROFILE = "EDIT_MY_AVATAR_PROFILE";
export const EDIT_MY_BANNER_PROFILE = "EDIT_MY_BANNER_PROFILE";

const endpointMyProfile = "http://localhost:3005/utenti/me";
const token = localStorage.getItem("token");

export const getMyProfile = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingProfile());

    fetch(endpointMyProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Chiamata all'API partita..");
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: GET_MY_PROFILE,
          payload: resData,
        });
        // return resData;
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };
};

export const editMyProfile = (bodyUpdate: BodyUserUpdate) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointMyProfile, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyUpdate),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: EDIT_MY_PROFILE,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteMyProfile = () => {
  return (dispatch: AppDispatch) => {
    fetch(endpointMyProfile, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: DELETE_MY_PROFILE,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const updateMyAvatarProfile = (file: FormData) => {
  return (dispatch: AppDispatch) => {
    // const formData = new FormData();
    // formData.append("avatarUrl", file);
    fetch(endpointMyProfile + `/avatarUrl`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Profilo modificato: ", resData);
        dispatch({
          type: EDIT_MY_AVATAR_PROFILE,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const updateMyBannerProfile = (file: FormData) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointMyProfile + `/bannerUrl`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Profilo modificato: ", resData);
        dispatch({
          type: EDIT_MY_BANNER_PROFILE,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

// ACTIONS e API per la gestione degli utenti
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_SINGLE_USER_BY_ID = "GET_SINGLE_USER";
export const GET_SINGLE_USER_BY_USERNAME = "GET_SINGLE_USER_BY_USERNAME";
export const EDIT_USER_BY_ID = "EDIT_USER_BY_ID";
export const DELETE_USER_BY_ID = "DELETE_USER_BY_ID";

const endpointAllUsers = "http://localhost:3005/utenti";

export const LOADING_USER = "LOADING_USER";

export const loadingUser = () => {
  return {
    type: LOADING_USER,
    payload: true,
  };
};

export const getAllUsers = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingUser());
    fetch(endpointAllUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log("Utenti trovati: ", resData);
        dispatch({
          type: GET_ALL_USERS,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleUserById = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingUser());
    fetch(endpointAllUsers + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log("Utente cercato: ", resData);
        dispatch({
          type: GET_SINGLE_USER_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleUserByUsername = (username: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingUser());
    fetch(endpointAllUsers + `/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log("Utente cercato: ", resData);
        dispatch({
          type: GET_SINGLE_USER_BY_USERNAME,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editUserById = (id: string, body: BodyUserUpdate) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointAllUsers + `/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((resData) => {
        console.log("Profilo modificato: ", resData);
        dispatch({
          type: EDIT_USER_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteUserById = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointAllUsers + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Utente da eliminare ", resData);
        dispatch({
          type: DELETE_USER_BY_ID,
          payload: id,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

// Actions e API per le componenti film e serie tv

export const LOADING_FILM_SERIETV = "LOADING_FILM_SERIETV";
export const loadingFilmSerieTv = () => {
  return {
    type: LOADING_FILM_SERIETV,
    payload: true,
  };
};

const endpointFilm = "http://localhost:3005/movies";
const endpointSerieTv = "http://localhost:3005/serieTv";

export const GET_ALL_FILMS = "GET_ALL_FILMS";
export const CREATE_A_FILM = "CREATE_A_FILM";
export const GET_SINGLE_FILM_BY_ID = "GET_SINGLE_FILM_BY_ID";
export const GET_SINGLE_FILM_BY_TITOLO = "GET_SINGLE_FILM_BY_TITOLO";
export const EDIT_FILM_BY_ID = "EDIT_FILM_BY_ID";
export const DELETE_FILM_BY_ID = "DELETE_FILM_BY_ID";

export const GET_ALL_SERIES_TV = "GET_ALL_SERIES_TV";
export const CREATE_A_SERIE_TV = "CREATE_A_SERIE_TV";
export const GET_SINGLE_SERIE_TV_BY_ID = "GET_SINGLE_SERIE_TV_BY_ID";
export const GET_SINGLE_SERIE_TV_BY_TITOLO = "GET_SINGLE_SERIE_TV_BY_TITOLO";
export const EDIT_SERIE_TV_BY_ID = "EDIT_SERIE_TV_BY_ID";
export const DELETE_SERIE_TV_BY_ID = "DELETE_SERIE_TV_BY_ID";

export const getAllFilms = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointFilm, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Lista dei film: ", resData);
        dispatch({
          type: GET_ALL_FILMS,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const createAFilm = (film: BodyFilm) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointFilm, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Film creato: ", resData);
        dispatch({
          type: CREATE_A_FILM,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleFilmById = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointFilm + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Film: ", resData);
        dispatch({
          type: GET_SINGLE_FILM_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleFilmByTitolo = (titolo: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointFilm + `/${titolo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Film: ", resData);
        dispatch({
          type: GET_SINGLE_FILM_BY_TITOLO,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editFilmById = (id: string, film: BodyFilm) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointFilm + `${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Film editato: ", resData);
        dispatch({
          type: EDIT_FILM_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteFilmById = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointFilm + `${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Film eliminato: ", resData);
        dispatch({
          type: DELETE_FILM_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

// ------------------------------------------------

export const getAllSeriesTv = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointSerieTv, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Lista delle serie Tv: ", resData);
        dispatch({
          type: GET_ALL_SERIES_TV,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const createASerieTv = (serieTv: BodySerieTv) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointSerieTv, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serieTv),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Serie Tv creata: ", resData);
        dispatch({
          type: CREATE_A_SERIE_TV,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleSerieTvById = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointSerieTv + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("SerieTv: ", resData);
        dispatch({
          type: GET_SINGLE_SERIE_TV_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getSingleSerieTvByTitolo = (titolo: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingFilmSerieTv());
    fetch(endpointSerieTv + `/${titolo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Serie Tv: ", resData);
        dispatch({
          type: GET_SINGLE_SERIE_TV_BY_TITOLO,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editSerieTvById = (id: string, serieTv: BodySerieTv) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointSerieTv + `${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serieTv),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Serie Tv editata: ", resData);
        dispatch({
          type: EDIT_SERIE_TV_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteSerieTvById = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointSerieTv + `${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Serie Tv eliminato: ", resData);
        dispatch({
          type: DELETE_SERIE_TV_BY_ID,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

// ACTIONS e API delle componenti Commento e Post
export const LOADING_COMMENTO_POST = "LOADING_COMMENTO_POST";
export const loadingCommentoPost = () => {
  return {
    type: LOADING_COMMENTO_POST,
    payload: true,
  };
};

const endpointPost = "http://localhost:3005/post";
const endpointCommento = "http://loaclhost:3005/commenti";

export const GET_MY_POST = "GET_MY_POST";
export const EDIT_MY_POST = "EDIT_MY_POST";
export const EDIT_IMAGE_POST = "ADD_IMAGE_POST";
export const DELETE_MY_POST = "DELETE_MY_POST";
export const CREATE_POST = "CREATE_POST";
export const GET_ALL_POST = "GET_ALL_POST";
export const DELETE_A_POST = "DELETE_A_POST"; // per ADMIN

export const GET_COMMENTI_BY_POST = "GET_COMMENTI_BY_POST";
export const CREATE_COMMENTO = "CREATE_COMMENTO";
export const EDIT_MY_COMMENTO = "EDIT_MY_COMMENTO";
export const DELETE_MY_COMMENTO = "DELETE_MY_COMMENTO";

export const getAllMyPost = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingCommentoPost());
    fetch(endpointPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("I miei post: ", resData);
        dispatch({
          type: GET_MY_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editMyPost = (id: string, post: BodyPost) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointPost + `/me/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Post modificato: ", resData);
        dispatch({
          type: EDIT_MY_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editImagePost = (id: string, file: FormData) => {
  return (dispatch: AppDispatch) => {
    fetch(editMyPost + `/me/${id}/imageUrl`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Immagine del post modificata: ", resData);
        dispatch({
          type: EDIT_IMAGE_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteMyPost = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointCommento + `/me/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Post eliminato: ", resData);
        dispatch({
          type: DELETE_MY_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const getAllPost = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingCommentoPost());
    fetch(endpointPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Tutti i post: ", resData);
        dispatch({
          type: GET_ALL_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const createAPost = (post: BodyPost) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointPost, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Post creato: ", resData);
        dispatch({
          type: CREATE_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deletePost = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointPost + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Post eliminato: ", resData);
        dispatch({
          type: DELETE_A_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

// -------------------------------------------------------
export const getCommentiByPost = (postId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingCommentoPost());
    fetch(endpointCommento + `/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Commenti del post: ", resData);
        dispatch({
          type: GET_COMMENTI_BY_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const createCommento = (commento: BodyCommento) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointCommento, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commento),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Commento creato: ", resData);
        dispatch({
          type: CREATE_COMMENTO,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const editMyCommento = (id: string, commento: BodyCommento) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointCommento + `/me/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${id}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commento),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Commento modificato: ", resData);
        dispatch({
          type: EDIT_MY_COMMENTO,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};

export const deleteMyCommento = (id: string) => {
  return (dispatch: AppDispatch) => {
    fetch(endpointCommento + `/me/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((resData) => {
        console.log("Commento cancellato: ", resData);
        dispatch({
          type: DELETE_MY_POST,
          payload: resData,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};
