import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

// Async thunk to fetch jobs from Firestore with simplified filters
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const filters = state.jobs.filters;

      let jobsQuery = collection(db, "jobs");

      if (filters.skill.length > 0) {
        jobsQuery = query(
          jobsQuery,
          where("searchTags.skill", "in", filters.skill),
        );
      }

      if (filters.city.length > 0) {
        jobsQuery = query(
          jobsQuery,
          where("jobLocation.city", "in", filters.city),
        );
      }

      if (filters.workMode !== "") {
        jobsQuery = query(jobsQuery, where("workMode", "==", filters.workMode));
      }

      if (filters.jobType !== "") {
        jobsQuery = query(jobsQuery, where("jobType", "==", filters.jobType));
      }

      if (filters.category) {
        jobsQuery = query(
          jobsQuery,
          where("searchTags.category", "==", filters.category),
        );
      }

      const querySnapshot = await getDocs(jobsQuery);
      const jobsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return jobsData;
    } catch (error) {
      throw new Error("Error fetching jobs from Firestore");
    }
  },
);

// Async thunk to fetch a single job by ID from Firestore
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id) => {
    try {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Job not found");
      }
    } catch (error) {
      throw new Error("Error fetching job by ID from Firestore");
    }
  },
);

//////////
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    filters: {
      skill: "",
      city: "",
      workMode: "",
      jobType: "",
      category: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters[action.payload.name] = action.payload.value;
    },

    resetFilters: (state) => {
      state.filters = {
        skill: "",
        city: "",
        workMode: "",
        jobType: "",
        category: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchJobById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, resetFilters } = jobsSlice.actions;

export default jobsSlice.reducer;
