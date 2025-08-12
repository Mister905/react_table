import { combineReducers } from "@reduxjs/toolkit";
// import pokemonReducer from "./pokemon_reducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Infer root state type
export default rootReducer;
