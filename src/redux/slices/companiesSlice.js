import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const companiesCollection = collection(db, "companies");
const jobsCollection = collection(db, "jobs");

// Async thunk to fetch companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(companiesCollection);
      const companies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //  console.log('cmpanies')
      return companies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch jobs for a specific company
export const fetchCompanyJobs = createAsyncThunk(
  "companies/fetchCompanyJobs",
  async (companyName, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { companiesWithJobs } = state.companies;

      // Return cached jobs if they already exist for this company
      if (companiesWithJobs[companyName]) {
        return { companyName, jobs: companiesWithJobs[companyName] };
      }
      // console.log(state.companies)
      // Fetch jobs from Firestore if not cached
      const q = query(jobsCollection, where("companyName", "==", companyName));
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { companyName, jobs: jobs.length > 0 ? jobs : [] }; // Ensure empty array if no jobs are found
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch a single company by its ID
export const fetchCompanyById = createAsyncThunk(
  "companies/fetchCompanyById",
  async (companyId, { rejectWithValue }) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);

      const companyDoc = await getDoc(companyDocRef);

      if (companyDoc.exists()) {
        return { id: companyDoc.id, ...companyDoc.data() };
      } else {
        throw new Error("Company not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    companiesWithJobs: {},
    loadingCompanies: false,
    loadingCompanyJobs: false,
    companiesError: null,
    jobsError: null,
    singleCompany: null,
    loadingSingleCompany: false,
    singleCompanyError: null,
    companiesCurrentPage: 1,
  },
  reducers: {
    clearRelatedJobs: (state) => {
      state.companiesWithJobs = {};
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loadingCompanies = true;
        state.companiesError = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loadingCompanies = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loadingCompanies = false;
        state.companiesError = action.payload;
      })
      // Fetch jobs for a specific company
      .addCase(fetchCompanyJobs.pending, (state) => {
        state.loadingCompanyJobs = true;
        state.jobsError = null;
      })
      .addCase(fetchCompanyJobs.fulfilled, (state, action) => {
        state.loadingCompanyJobs = false;
        const { companyName, jobs } = action.payload;
        state.companiesWithJobs[companyName] = jobs;
      })
      .addCase(fetchCompanyJobs.rejected, (state, action) => {
        state.loadingCompanyJobs = false;
        state.jobsError = action.payload;
      })

      // Fetch a single company by its ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loadingSingleCompany = true;
        state.singleCompanyError = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loadingSingleCompany = false;
        state.singleCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loadingSingleCompany = false;
        state.singleCompanyError = action.payload;
      });
  },
});

export const { clearRelatedJobs, setCurrentPage } = companiesSlice.actions;

export default companiesSlice.reducer;
