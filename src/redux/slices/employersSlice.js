import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from "../../Firebase/firebaseConfig";
import { supabase } from '../../SuperBase/SuperBaseConfig';

export const signupUser = createAsyncThunk(
  'employersSignUp/signupUser',
  async ({ name, email, profession, password, profileImage }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      const provider = new GoogleAuthProvider();
      try {
        await linkWithPopup(userCredential.user, provider);
      } catch (error) {
        if (
          error.code !== 'auth/popup-closed-by-user' &&
          error.code !== 'auth/provider-already-linked'
        ) {
          throw new Error('Google linking failed: ' + error.message);
        }
      }

      let imageUrl = null;
      if (profileImage) {
        const ext = profileImage.name.split('.').pop();
        const filePath = `Employers-images/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('Employers').upload(filePath, profileImage, {
          cacheControl: '3600',
          upsert: false
        });

        if (error) throw new Error(`Image upload failed: ${error.message}`);
        const { data } = supabase.storage.from('Employers').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      const employersDoc = doc(db, 'employers', uid);
      await setDoc(employersDoc, { name, email, profession, imageUrl });

      return {
        uid,
        name,
        email,
        profession,
        imageUrl,
        role: 'employer'
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'employersSignUp/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      const employersDoc = doc(db, 'employers', uid);
      const docSnap = await getDoc(employersDoc);

      if (!docSnap.exists()) {
        await signOut(auth);
        throw new Error('No employer profile found for this email.');
      }

      return {
        uid,
        role: 'employer',
        message: 'Login successful!',
        ...docSnap.data()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'employersSignUp/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = userCredential.user;

      const docSnap = await getDoc(doc(db, 'employers', uid));
      if (!docSnap.exists()) {
        await signOut(auth);
        throw new Error('No employer profile found for this Google account.');
      }

      return {
        uid,
        email,
        displayName,
        role: 'employer',
        message: 'Login successful!',
        ...docSnap.data()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addJobToFirestore = createAsyncThunk(
  'employersSignUp/addJobToFirestore',
  async (
    {
      jobTitle,
      workMode,
      companyName,
      minSalary,
      maxSalary,
      jobCountry,
      jobCity,
      employmentType,
      salaryCurrency,
      jobDescription,
      jobRequirements,
      jobImage
    },
    { rejectWithValue }
  ) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return rejectWithValue('No user is authenticated');
    const { uid } = currentUser;

    try {
      let jobImageUrl = null;

      if (jobImage) {
        const ext = jobImage.name.split('.').pop();
        const filePath = `Job-images/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('Employers').upload(filePath, jobImage, {
          cacheControl: '3600',
          upsert: false
        });

        if (error) throw new Error(`Image upload failed: ${error.message}`);
        const { data } = supabase.storage.from('Employers').getPublicUrl(filePath);
        jobImageUrl = data.publicUrl;
      }

      const newJob = {
        employerId: uid,
        jobTitle: jobTitle.toLowerCase(),
        workMode: workMode.toLowerCase(),
        jobType: employmentType.toLowerCase(),
        companyName: companyName.toLowerCase(),
        jobLocation: {
          country: jobCountry.toLowerCase(),
          city: jobCity.toLowerCase()
        },
        salaryRange: { min: minSalary, max: maxSalary },
        jobDescription,
        jobRequirements,
        companyImage: jobImageUrl,
        salaryCurrency: salaryCurrency.toLowerCase()
      };

      await addDoc(collection(db, 'jobs'), newJob);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employersSignUpSlice = createSlice({
  name: 'employersSignUp',
  initialState: {
    user: null,
    role: null,
    formLoading: false,
    googleLoading: false,
    error: null,
    message: null,
    loading: null,
    jobLoading: false,
    jobError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.formLoading = false;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
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
      })

      .addCase(addJobToFirestore.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(addJobToFirestore.fulfilled, (state) => {
        state.jobLoading = false;
      })
      .addCase(addJobToFirestore.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload;
      });
  }
});

export default employersSignUpSlice.reducer;
