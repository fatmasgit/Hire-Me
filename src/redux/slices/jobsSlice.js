import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// Helper: Convert string to Title Case (optional)
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

// Fetch all jobs once (no filters)
export const fetchAllJobs = createAsyncThunk("jobs/fetchAllJobs", async () => {
  const colRef = collection(db, "jobs");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// Fetch filtered jobs using filtered IDs from q filter + other filters via Firestore
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const filters = state.jobs.filters;
    const allJobs = state.jobs.allJobs || [];

    let filteredByQIds = null;

    if (filters.q) {
      const qLower = filters.q.toLowerCase();

      const filteredJobsByQ = allJobs.filter((job) => {
        const titleMatch = job.jobTitle?.toLowerCase().includes(qLower);
        const skillsMatch = Array.isArray(job.jobSkills)
          ? job.jobSkills.some((skill) => skill.toLowerCase().includes(qLower))
          : false;
        const searchTagMatch = job.searchTags?.skill
          ? job.searchTags.skill.toLowerCase().includes(qLower)
          : false;

        return titleMatch || skillsMatch || searchTagMatch;
      });

      filteredByQIds = filteredJobsByQ.map((job) => job.id);

      if (filteredByQIds.length === 0) {
        thunkAPI.dispatch(setFilteredByQIds([]));
        return [];
      }

      if (filteredByQIds.length > 10) {
        filteredByQIds = filteredByQIds.slice(0, 10);
      }

      thunkAPI.dispatch(setFilteredByQIds(filteredByQIds));
    } else {
      thunkAPI.dispatch(setFilteredByQIds([]));
    }

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

    if (filteredByQIds) {
      jobsQuery = query(jobsQuery, where(documentId(), "in", filteredByQIds));
    }

    const querySnapshot = await getDocs(jobsQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id) => {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("Job not found");
  },
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    allJobs: [],
    filteredByQIds: [],
    filters: {
      skill: [],
      city: [],
      workMode: "",
      jobType: "",
      category: "",
      q: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filters[action.payload.name] = action.payload.value;
    },
    resetFilters(state) {
      state.filters = {
        skill: [],
        city: [],
        workMode: "",
        jobType: "",
        category: "",
        q: "",
      };
    },
    setFilteredByQIds(state, action) {
      state.filteredByQIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allJobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

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

export const { setFilter, resetFilters, setFilteredByQIds } = jobsSlice.actions;
export default jobsSlice.reducer;
