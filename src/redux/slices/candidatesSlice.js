import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { supabase } from '../../SuperBase/SuperBaseConfig';
import { auth, db } from '../../Firebase/firebaseConfig';


// Async thunk to handle candidate signup with image and CV upload
export const signupCandidate = createAsyncThunk(
  'candidatesSignUp/signupCandidate',
  async ({
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
    cv
  }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Image upload to Supabase Storage
      let imageUrl = null;
      if (profilePhoto) {
        const fileExt = profilePhoto.name.split('.').pop();
        const fileName = `${uid}.${fileExt}`;
        const filePath = `candidate-images/${fileName}`;

        const { error: imageUploadError } = await supabase.storage
          .from('Candidate')
          .upload(filePath, profilePhoto, { cacheControl: '3600', upsert: false });

        if (imageUploadError) {
          throw new Error(`Image upload failed: ${imageUploadError.message}`);
        }

        const { data: publicUrlData, error: imageUrlError } = supabase.storage
          .from('Candidate')
          .getPublicUrl(filePath);

        if (imageUrlError) {
          throw new Error(`Failed to get image URL: ${imageUrlError.message}`);
        }

        imageUrl = publicUrlData.publicUrl;
      }

      // CV upload to Supabase Storage
      let cvUrl = null;
      if (cv) {
        const fileExt = cv.name.split('.').pop();
        const fileName = `${uid}-cv.${fileExt}`;
        const filePath = `candidate-cvs/${fileName}`;

        const { error: cvUploadError } = await supabase.storage
          .from('Candidate')
          .upload(filePath, cv, { cacheControl: '3600', upsert: false });

        if (cvUploadError) {
          throw new Error(`CV upload failed: ${cvUploadError.message}`);
        }

        const { data: cvUrlData, error: cvUrlError } = supabase.storage
          .from('Candidate')
          .getPublicUrl(filePath);

        if (cvUrlError) {
          throw new Error(`Failed to get CV URL: ${cvUrlError.message}`);
        }

        cvUrl = cvUrlData.publicUrl;
      }

      // Save candidate details in Firestore
      const candidatesDoc = doc(db, 'candidates', uid);
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
        role: 'candidate',
        firstName,
        lastName,
        email,
        imageUrl,
        cvUrl,
        major,
        educationLevel,
        graduationYear
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// login thunk function
export const loginCandidate = createAsyncThunk(
  'candidatesSignUp/loginCandidate',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // fetch user data from firestore after login
      const candidatesDoc = doc(db, 'candidates', uid);
      const docSnap = await getDoc(candidatesDoc);

      if (docSnap.exists()) {
        return {
          uid,
          role: 'candidate',
          message: 'Login successful!',
          ...docSnap.data()
        };
      } else {
        throw new Error('No such user found!');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return rejectWithValue('User not found!');
      } else if (error.code === 'auth/wrong-password') {
        return rejectWithValue('Incorrect password!');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


// sign in with google
export const loginWithGoogle = createAsyncThunk(
  'candidatesSignUp/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = userCredential.user;

      return {
        uid,
        email,
        displayName,
        role: 'candidate',
        message: 'Login successful!'
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Redux slice for candidate 
const candidatesSignUpSlice = createSlice({
  name: 'candidatesSignUp',
  initialState: {
    user: null,
    role: null,
    formLoading: false,
    googleLoading: false,
    error: null,
    message: null,
    loading: null
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
