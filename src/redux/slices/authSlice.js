import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Async thunk to check authentication and fetch Firestore data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const displayName = user.displayName || null;

        // Check if user is an employer
        const employerDocRef = doc(db, "employers", uid);
        const employerDocSnap = await getDoc(employerDocRef);

        if (employerDocSnap.exists()) {
          return {
            authenticated: true,
            userDocument: employerDocSnap.data(),
            role: "employer",
            displayName,
          };
        }

        // Check if user is a candidate
        const candidateDocRef = doc(db, "candidates", uid);
        const candidateDocSnap = await getDoc(candidateDocRef);

        if (candidateDocSnap.exists()) {
          return {
            authenticated: true,
            userDocument: candidateDocSnap.data(),
            role: "candidate",
            displayName,
          };
        }

        // User is logged in but has no matching document
        return {
          authenticated: true,
          userDocument: null,
          role: null,
          displayName,
        };
      }

      // No logged-in user
      return {
        authenticated: false,
        userDocument: null,
        role: null,
        displayName: null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to log out the user
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut(); // Firebase sign-out
      return {
        authenticated: false,
        userDocument: null,
        role: null,
        displayName: null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    userDocument: null,
    role: null,
    displayName: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.userDocument = action.payload.userDocument;
        state.role = action.payload.role;
        state.displayName = action.payload.displayName;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.userDocument = null;
        state.role = null;
        state.displayName = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
