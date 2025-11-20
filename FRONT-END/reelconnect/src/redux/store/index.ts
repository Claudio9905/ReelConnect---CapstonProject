import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducer/profileReducer";
import userListReducer from "../reducer/userListReducer";
import singleUserByIdReducer from "../reducer/singleUserByIdReducer";
import singleUserByUsernameReducer from "../reducer/singleUserByUsernameReducer";
import editUserByIdReducer from "../reducer/editUserByIdReducer";
import deleteUserByIdReducer from "../reducer/deleteUserByIdReducer";

const combinedReducer = combineReducers({
  myProfile: profileReducer,
  listUser: userListReducer,
  singleUserById: singleUserByIdReducer,
  singleUSerByUsername: singleUserByUsernameReducer,
  editUser: editUserByIdReducer,
  deleteUser: deleteUserByIdReducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
