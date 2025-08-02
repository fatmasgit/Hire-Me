import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Async thunk to check authentication and fetch Firestore data
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const displayName = user.displayName || null;

        // Attempt to get the employer document
        const employerDocRef = doc(db, 'employers', uid);
        const employerDocSnap = await getDoc(employerDocRef);

        if (employerDocSnap.exists()) {
          return {
            authenticated: true,
            userDocument: employerDocSnap.data(),
            role: 'employer',
            displayName,
          };
        }

        // Attempt to get the candidate document
        const candidateDocRef = doc(db, 'candidates', uid);
        const candidateDocSnap = await getDoc(candidateDocRef);

        if (candidateDocSnap.exists()) {
          return {
            authenticated: true,
            userDocument: candidateDocSnap.data(),
            role: 'candidate',
            displayName,
          };
        }

        // No document found
        return {
          authenticated: true,
          userDocument: null,
          role: null,
          displayName,
        };
      }

      // User is not authenticated
      return { authenticated: false, userDocument: null, role: null, displayName: null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






// Async thunk to log out the user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
      return { authenticated: false, userDocument: null, role: null, displayName: null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Slice to manage authentication state
const authSlice = createSlice({
  name: 'auth',
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



      //log Out
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.userDocument = action.payload.userDocument;
        state.role = action.payload.role;
        state.displayName = action.payload.displayName;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export default authSlice.reducer;
