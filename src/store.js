// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import jobsReducer from "./redux/slices/jobsSlice";
import employersSignUpReducer from './redux/slices/employersSlice';
import candidateSignUpReducer from './redux/slices/candidatesSlice';
import candidateProfileReducer from './redux/slices/profileSlice';
import companiesReducer from "./redux/slices/companiesSlice";
import authReducer from "./redux/slices/authSlice";

// Combine reducers
const rootReducer = combineReducers({
  jobs: jobsReducer,
  employersSignUp: employersSignUpReducer,
  candidateSignUp: candidateSignUpReducer,
  candidateProfile: candidateProfileReducer,
  companies: companiesReducer,
  auth: authReducer,
});

// redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["employersSignUp", "candidateSignUp"], // persist these slices only
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Export store and persistor
export const persistor = persistStore(store);
export default store;
