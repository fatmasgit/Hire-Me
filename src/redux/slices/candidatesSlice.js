import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { supabase } from "../../SuperBase/SuperBaseConfig";
import { auth, db } from "../../Firebase/firebaseConfig";

// Signup with Google account linking
export const signupCandidate = createAsyncThunk(
  "candidatesSignUp/signupCandidate",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      university,
      major,
      educationLevel,
      graduationYear,
      profilePhoto,
      cv,
    },
    { rejectWithValue },
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = userCredential.user;

      // 🔗 Attempt to link Google account
      const provider = new GoogleAuthProvider();
      try {
        await linkWithPopup(userCredential.user, provider);
      } catch (error) {
        if (
          error.code !== "auth/popup-closed-by-user" &&
          error.code !== "auth/provider-already-linked"
        ) {
          throw new Error("Google linking failed: " + error.message);
        }
      }

      // Upload profile photo
      let imageUrl = null;
      if (profilePhoto) {
        const ext = profilePhoto.name.split(".").pop();
        const filePath = `candidate-images/${uid}.${ext}`;
        await supabase.storage
          .from("Candidate")
          .upload(filePath, profilePhoto, { upsert: false });
        const { data } = supabase.storage
          .from("Candidate")
          .getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      // Upload CV
      let cvUrl = null;
      if (cv) {
        const ext = cv.name.split(".").pop();
        const filePath = `candidate-cvs/${uid}-cv.${ext}`;
        await supabase.storage
          .from("Candidate")
          .upload(filePath, cv, { upsert: false });
        const { data } = supabase.storage
          .from("Candidate")
          .getPublicUrl(filePath);
        cvUrl = data.publicUrl;
      }

      // Save Firestore document
      const candidatesDoc = doc(db, "candidates", uid);
      await setDoc(candidatesDoc, {
        firstName,
        lastName,
        email,
        dateOfBirth,
        university,
        major,
        educationLevel,
        graduationYear,
        imageUrl,
        cvUrl,
        createdAt: new Date().toISOString(),
      });

      return {
        uid,
        role: "candidate",
        firstName,
        lastName,
        email,
        imageUrl,
        cvUrl,
        major,
        educationLevel,
        graduationYear,
      };
    } catch (error) {
      // Handle Firebase auth errors with friendly messages
      let message = error.message;

      if (
        error.code === "auth/email-already-in-use" ||
        message.includes("auth/email-already-in-use")
      ) {
        message = "Account already in use";
      }

      return rejectWithValue(message);
    }
  },
);

// login with email/password
export const loginCandidate = createAsyncThunk(
  "candidatesSignUp/loginCandidate",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = userCredential.user;

      const docSnap = await getDoc(doc(db, "candidates", uid));
      if (!docSnap.exists()) {
        await signOut(auth);
        throw new Error("No candidate profile found for this email.");
      }

      return {
        uid,
        role: "candidate",
        message: "Login successful!",
        ...docSnap.data(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// login with Google (only if Firestore profile exists)
export const loginWithGoogle = createAsyncThunk(
  "candidatesSignUp/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { uid, email } = userCredential.user;

      const docSnap = await getDoc(doc(db, "candidates", uid));
      if (!docSnap.exists()) {
        await signOut(auth);
        throw new Error("No candidate profile found for this Google account.");
      }

      return {
        uid,
        email,
        role: "candidate",
        message: "Login successful!",
        ...docSnap.data(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const candidatesSignUpSlice = createSlice({
  name: "candidatesSignUp",
  initialState: {
    user: null,
    role: null,
    formLoading: false,
    googleLoading: false,
    error: null,
    message: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(signupCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginCandidate.pending, (state) => {
        state.formLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginCandidate.fulfilled, (state, action) => {
        state.formLoading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(loginCandidate.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      .addCase(loginWithGoogle.pending, (state) => {
        state.googleLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.googleLoading = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export default candidatesSignUpSlice.reducer;
