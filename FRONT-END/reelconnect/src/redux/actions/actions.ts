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
