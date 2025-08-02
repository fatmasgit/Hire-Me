// store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./redux/slices/jobsSlice";
import employersSignUpReducer from './redux/slices/employersSlice';
import candidateSignUpReducer from './redux/slices/candidatesSlice'; 
import candidateProfileReducer from './redux/slices/profileSlice'; 
import companiesReducer from "./redux/slices/companiesSlice"; 
import authReducer from "./redux/slices/authSlice";



const store = configureStore({
  reducer: {
   jobs: jobsReducer,
    employersSignUp: employersSignUpReducer,
    candidateSignUp: candidateSignUpReducer, 
    candidateProfile: candidateProfileReducer, 
    companies: companiesReducer,
    auth: authReducer, 

  },
});

export default store;
