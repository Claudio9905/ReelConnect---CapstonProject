import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducer/profileReducer";
import userListReducer from "../reducer/userListReducer";
import singleUserByIdReducer from "../reducer/singleUserByIdReducer";
import singleUserByUsernameReducer from "../reducer/singleUserByUsernameReducer";
import editUserByIdReducer from "../reducer/editUserByIdReducer";
import deleteUserByIdReducer from "../reducer/deleteUserByIdReducer";
import filmReducer from "../reducer/filmReducer";
import serieTvReducer from "../reducer/serieTvReducer";
import getFilmByIdReducer from "../reducer/getFilmByIdReducer";
import getFilmByTitoloReducer from "../reducer/getFilmByTitoloReducer";
import editFilmByIdReducer from "../reducer/editFilmByIdReducer";
import createFilmReducer from "../reducer/createFilmReducer";
import deleteFilmByIdReducer from "../reducer/deleteFilmByIdReducer";
import getSerieTvByIdReducer from "../reducer/getSerieTvByIdReducer";
import getSerieTvByTitoloReducer from "../reducer/getSerieTvByTitoloReducer";
import createSerieTvReducer from "../reducer/createSerieTvReducer";
import editSerieTvByIdReducer from "../reducer/editSerieTvByIdReducer";
import deleteSerieTvByIdReducer from "../reducer/deleteSerieTvByIdReducer";
import postReducer from "../reducer/postReducer";
import myPostReducer from "../reducer/myPostReducer";
import postSettingsReducer from "../reducer/postSettingsReducer";
import commentiReducer from "../reducer/commentiReducer";
import commentiSettingsReducer from "../reducer/commentiSettingsReducer";

const combinedReducer = combineReducers({
  myProfile: profileReducer,
  listUser: userListReducer,
  singleUserById: singleUserByIdReducer,
  singleUSerByUsername: singleUserByUsernameReducer,
  editUser: editUserByIdReducer,
  deleteUser: deleteUserByIdReducer,
  allMovies: filmReducer,
  allSeriesTv: serieTvReducer,
  singleFilmById: getFilmByIdReducer,
  singleFilmByTitolo: getFilmByTitoloReducer,
  createFilm: createFilmReducer,
  editFilm: editFilmByIdReducer,
  deleteFilm: deleteFilmByIdReducer,
  singleSerieTVById: getSerieTvByIdReducer,
  singleSerieTvByTitolo: getSerieTvByTitoloReducer,
  createSerieTv: createSerieTvReducer,
  editSerieTv: editSerieTvByIdReducer,
  deleteSerieTv: deleteSerieTvByIdReducer,
  allPost: postReducer,
  myPost: myPostReducer,
  postSettings: postSettingsReducer,
  allCommenti: commentiReducer,
  commentiSettings: commentiSettingsReducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
